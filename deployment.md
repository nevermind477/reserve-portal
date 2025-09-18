# FastAPI Project - Деплой

Вы можете развернуть проект с помощью Docker Compose на удалённый сервер.

Этот проект ожидает, что у вас есть прокси Traefik, обрабатывающий соединения с внешним миром и HTTPS-сертификаты.

Вы можете использовать CI/CD (непрерывная интеграция и непрерывный деплой), чтобы разворачивать автоматически — уже есть готовые конфигурации для GitHub Actions.

Но сначала нужно настроить несколько вещей. 🤓

## Подготовка

* Подготовьте удалённый сервер.
* Настройте DNS-записи вашего домена так, чтобы они указывали на IP этого сервера.
* Настройте wildcard-поддомен для вашего домена, чтобы можно было иметь несколько поддоменов для разных сервисов, например:  
  `*.fastapi-project.example.com`.  
  Это пригодится для доступа к разным компонентам:  
  `dashboard.fastapi-project.example.com`, `api.fastapi-project.example.com`,  
  `traefik.fastapi-project.example.com`, `adminer.fastapi-project.example.com`, и т.д.  
  Также для `staging`:  
  `dashboard.staging.fastapi-project.example.com`, `adminer.staging-fastapi-project.example.com`, и т.п.
* Установите и настройте [Docker](https://docs.docker.com/engine/install/) на удалённом сервере (Docker Engine, не Docker Desktop).

## Публичный Traefik

Нам нужен прокси Traefik, чтобы обрабатывать входящие соединения и HTTPS-сертификаты.

Следующие шаги нужно сделать только один раз.

### Docker Compose для Traefik

* Создайте директорию на сервере для Traefik:

```bash
mkdir -p /root/code/traefik-public/
```

* Скопируйте файл `docker-compose.traefik.yml` на сервер, например командой:

```bash
rsync -a docker-compose.traefik.yml root@your-server.example.com:/root/code/traefik-public/
```

### Публичная сеть Traefik

Traefik будет ожидать наличие публичной сети Docker с именем `traefik-public` для взаимодействия со стеками.

Так будет один публичный Traefik-прокси, обрабатывающий HTTP/HTTPS извне, а за ним может быть несколько стеков с разными доменами даже на одном сервере.

Создайте эту сеть на сервере:

```bash
docker network create traefik-public
```

### Переменные окружения Traefik

Файл `docker-compose.traefik.yml` ожидает, что в терминале будут установлены переменные окружения.

* Логин для HTTP Basic Auth:

```bash
export USERNAME=admin
```

* Пароль:

```bash
export PASSWORD=changethis
```

* Сгенерируйте хеш пароля:

```bash
export HASHED_PASSWORD=$(openssl passwd -apr1 $PASSWORD)
```

* Проверьте:

```bash
echo $HASHED_PASSWORD
```

* Домен:

```bash
export DOMAIN=fastapi-project.example.com
```

* Email для Let's Encrypt:

```bash
export EMAIL=admin@example.com
```

⚠️ Email вида `@example.com` работать не будет.

### Запуск Traefik

Перейдите в директорию:

```bash
cd /root/code/traefik-public/
```

Запустите:

```bash
docker compose -f docker-compose.traefik.yml up -d
```

## Деплой FastAPI проекта

Теперь, когда Traefik запущен, можно развернуть FastAPI проект через Docker Compose.

ℹ️ Вы также можете перейти к разделу про деплой через GitHub Actions.

## Переменные окружения

Сначала нужно задать переменные окружения.

* Установите окружение (по умолчанию `local`, на сервере будет `staging` или `production`):

```bash
export ENVIRONMENT=production
```

* Укажите домен:

```bash
export DOMAIN=fastapi-project.example.com
```

* Прочие переменные:
  - `PROJECT_NAME` — имя проекта (для API и писем).
  - `STACK_NAME` — имя стека (разное для `staging`, `production` и т.д.).
  - `BACKEND_CORS_ORIGINS` — список разрешённых CORS-источников.
  - `SECRET_KEY` — секретный ключ для токенов.
  - `FIRST_SUPERUSER` — email суперпользователя.
  - `FIRST_SUPERUSER_PASSWORD` — пароль суперпользователя.
  - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, `EMAILS_FROM_EMAIL` — SMTP-настройки.
  - `POSTGRES_SERVER`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` — параметры БД.
  - `SENTRY_DSN` — DSN для Sentry.

## Переменные окружения для GitHub Actions

Есть отдельные переменные для GitHub Actions:

* `LATEST_CHANGES` — токен для [latest-changes](https://github.com/tiangolo/latest-changes).
* `SMOKESHOW_AUTH_KEY` — ключ для [Smokeshow](https://github.com/samuelcolvin/smokeshow).

### Генерация секретных ключей

По умолчанию некоторые значения равны `changethis`. Смените их на реальные секреты:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Деплой через Docker Compose

Когда все переменные заданы:

```bash
docker compose -f docker-compose.yml up -d
```

## Непрерывный деплой (CD)

Можно использовать GitHub Actions для автоматического деплоя. 😎

Уже настроены окружения `staging` и `production`. 🚀

### Установка GitHub Actions Runner

* Создайте пользователя:

```bash
sudo adduser github
```

* Дайте ему доступ к Docker:

```bash
sudo usermod -aG docker github
```

* Переключитесь:

```bash
sudo su - github
```

* Установите runner по [официальной инструкции](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/adding-self-hosted-runners#adding-a-self-hosted-runner-to-a-repository).

* Добавьте label (например, `production`).

Чтобы runner запускался как сервис:

```bash
cd /home/github/actions-runner
./svc.sh install github
./svc.sh start
./svc.sh status
```

Подробнее: [Configuring the self-hosted runner application as a service](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/configuring-the-self-hosted-runner-application-as-a-service).

### Настройка секретов

В GitHub репозитории добавьте секреты (Settings → Secrets):

* `DOMAIN_PRODUCTION`
* `DOMAIN_STAGING`
* `STACK_NAME_PRODUCTION`
* `STACK_NAME_STAGING`
* `EMAILS_FROM_EMAIL`
* `FIRST_SUPERUSER`
* `FIRST_SUPERUSER_PASSWORD`
* `POSTGRES_PASSWORD`
* `SECRET_KEY`
* `LATEST_CHANGES`
* `SMOKESHOW_AUTH_KEY`

## Workflows GitHub Actions

Уже есть workflow-файлы в `.github/workflows` для деплоя:

* `staging` — при пуше/мерже в `master`.
* `production` — при релизе.

## URLs

Замените `fastapi-project.example.com` на свой домен.

### Главная панель Traefik

`https://traefik.fastapi-project.example.com`

### Production

* Frontend: `https://dashboard.fastapi-project.example.com`
* API docs: `https://api.fastapi-project.example.com/docs`
* API: `https://api.fastapi-project.example.com`
* Adminer: `https://adminer.fastapi-project.example.com`

### Staging

* Frontend: `https://dashboard.staging-fastapi-project.example.com`
* API docs: `https://api.staging-fastapi-project.example.com/docs`
* API: `https://api.staging-fastapi-project.example.com`
* Adminer: `https://adminer.staging-fastapi-project.example.com`

