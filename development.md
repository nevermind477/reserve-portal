# FastAPI Project - Разработка

## Docker Compose

* Запустите локальный стек с Docker Compose:

```bash
docker compose watch
```

* Теперь вы можете открыть браузер и использовать эти URL:

Frontend через Docker: http://localhost:5173

Backend, JSON API на основе OpenAPI: http://localhost:8000

Автоматическая интерактивная документация (Swagger UI): http://localhost:8000/docs

Adminer, веб-админка БД: http://localhost:8080

Traefik UI, чтобы видеть маршрутизацию через прокси: http://localhost:8090

**Примечание**: при первом запуске стека может понадобиться минута, пока backend ждёт готовности базы данных и конфигурирует всё. Можно проверять логи.

Для просмотра логов (в другом терминале):

```bash
docker compose logs
```

Логи конкретного сервиса:

```bash
docker compose logs backend
```

## Локальная разработка

Docker Compose настроен так, что каждый сервис доступен на отдельном порту `localhost`.

Backend: http://localhost:8000  
Frontend: http://localhost:5173

Таким образом, можно выключить Docker Compose сервис и запустить локальный dev-сервер — всё продолжит работать, так как порты совпадают.

Пример: остановить frontend:

```bash
docker compose stop frontend
```

Запустить локальный frontend:

```bash
cd frontend
npm run dev
```

Остановить backend:

```bash
docker compose stop backend
```

Запустить локальный backend:

```bash
cd backend
fastapi dev app/main.py
```

## Docker Compose с `localhost.tiangolo.com`

При запуске Docker Compose используется `localhost` с разными портами.

Для продакшена/стейджинга сервисы развертываются на поддоменах, например: `api.example.com` для backend, `dashboard.example.com` для frontend.

Подробности о Traefik см. в [deployment.md]. Traefik маршрутизирует трафик по поддоменам.

Для локального теста можно изменить `.env`:

```dotenv
DOMAIN=localhost.tiangolo.com
```

Traefik направит трафик:  
`api.localhost.tiangolo.com` → backend  
`dashboard.localhost.tiangolo.com` → frontend

Домен `localhost.tiangolo.com` настроен на `127.0.0.1`, включая все поддомены.

После изменений перезапустите:

```bash
docker compose watch
```

Для локальной разработки Traefik включён через `docker-compose.override.yml`, чтобы протестировать работу поддоменов.

## Docker Compose файлы и переменные окружения

Главный `docker-compose.yml` содержит конфигурацию для всего стека.  
Файл `docker-compose.override.yml` добавляет переопределения для разработки, например монтирование исходного кода.  
Переменные из `.env` подставляются в контейнеры.

После изменения переменных перезапустите стек:

```bash
docker compose watch
```

## Файл .env

`.env` содержит все настройки, сгенерированные ключи и пароли.  
Если проект публичный, его можно исключить из Git, а CI/CD настроить на получение переменных другим способом.

## Pre-commit и линтеры

Используем [pre-commit](https://pre-commit.com/) для проверки кода и форматирования.

Он запускается перед коммитом, гарантируя консистентность кода.  
Конфигурация в `.pre-commit-config.yaml`.

### Установка pre-commit для автоматического запуска

`pre-commit` уже в зависимостях проекта. Можно установить глобально, следуя [документации](https://pre-commit.com/).

Для активации в локальном репозитории:

```bash
❯ uv run pre-commit install
pre-commit installed at .git/hooks/pre-commit
```

Теперь перед коммитом `pre-commit` проверяет и форматирует код.  
После исправления файлов нужно снова `git add`, затем коммит.

### Ручной запуск pre-commit

```bash
❯ uv run pre-commit run --all-files
check for added large files..............................................Passed
check toml...............................................................Passed
check yaml...............................................................Passed
ruff.....................................................................Passed
ruff-format..............................................................Passed
eslint...................................................................Passed
prettier.................................................................Passed
```

## URLs

Продакшн/стейджинг URL используют такие же пути, но с вашим доменом.

### URL для разработки

Frontend: http://localhost:5173  
Backend: http://localhost:8000  
Swagger UI: http://localhost:8000/docs  
ReDoc: http://localhost:8000/redoc  
Adminer: http://localhost:8080  
Traefik UI: http://localhost:8090  
MailCatcher: http://localhost:1080

### URL для разработки с `localhost.tiangolo.com`

Frontend: http://dashboard.localhost.tiangolo.com  
Backend: http://api.localhost.tiangolo.com  
Swagger UI: http://api.localhost.tiangolo.com/docs  
ReDoc: http://api.localhost.tiangolo.com/redoc  
Adminer: http://localhost.tiangolo.com:8080  
Traefik UI: http://localhost.tiangolo.com:8090  
MailCatcher: http://localhost.tiangolo.com:1080

