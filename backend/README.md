# FastAPI Проект - Бэкенд

## Требования
* [Docker](https://www.docker.com/).
* [uv](https://docs.astral.sh/uv/) для управления Python-пакетами и окружением.

## Docker Compose
Запусти локальное окружение разработки с помощью Docker Compose, следуя инструкции в [../development.md](../development.md).

## Общий рабочий процесс
По умолчанию зависимости управляются с помощью [uv](https://docs.astral.sh/uv/), установи его.  
Из директории `./backend/` можно установить все зависимости командой:

```console
$ uv sync
```

Затем активируй виртуальное окружение:

```console
$ source .venv/bin/activate
```

Убедись, что редактор использует правильное виртуальное окружение Python — интерпретатор по пути `backend/.venv/bin/python`.

- Модели SQLModel для данных и SQL-таблиц находятся в `./backend/app/models.py`  
- API endpoints — в `./backend/app/api/`  
- CRUD-утилиты — в `./backend/app/crud.py`

## VS Code
В проекте уже есть конфигурации для запуска бэкенда через отладчик VS Code, так что можно использовать брейкпоинты, паузу и исследовать переменные.  
Также настроен запуск тестов через вкладку Python Tests.

## Docker Compose Override
Во время разработки можно менять настройки Docker Compose только для локальной среды в файле `docker-compose.override.yml`.  
Эти изменения не затрагивают production.

Например:
- Код из директории бэкенда синхронизируется с контейнером.  
- Можно тестировать изменения без пересборки образа.  
- Используется `fastapi run --reload` вместо стандартного запуска — сервер перезапускается при изменении кода.  

Если в коде синтаксическая ошибка, контейнер остановится. После исправления можно перезапустить:

```console
$ docker compose watch
```

Можно войти в контейнер и работать там напрямую:

```console
$ docker compose exec backend bash
```

Оказавшись внутри, можно запустить сервер вручную:

```console
$ fastapi run --reload app/main.py
```

## Тесты бэкенда
Запуск всех тестов:

```console
$ bash ./scripts/test.sh
```

Тесты написаны на Pytest и находятся в `./backend/app/tests/`.  
Если используешь GitHub Actions, тесты запускаются автоматически.

Если стек уже поднят, можно выполнить тесты так:

```bash
docker compose exec backend bash scripts/tests-start.sh
```

Чтобы остановиться на первой ошибке:

```bash
docker compose exec backend bash scripts/tests-start.sh -x
```

После тестов будет сгенерирован отчёт покрытия в `htmlcov/index.html`.

## Миграции
В процессе разработки код приложения монтируется в контейнер как volume.  
Миграции можно запускать через Alembic прямо из контейнера, а изменения будут сохраняться в репозитории.

1. Войти в контейнер:
   ```console
   $ docker compose exec backend bash
   ```

2. Создать ревизию после изменения моделей:
   ```console
   $ alembic revision --autogenerate -m "Добавлен столбец last_name в модель User"
   ```

3. Применить миграцию:
   ```console
   $ alembic upgrade head
   ```

Если не хочешь использовать Alembic, можно раскомментировать:

```python
SQLModel.metadata.create_all(engine)
```

в `./backend/app/core/db.py` и закомментировать строку в `scripts/prestart.sh`:

```console
$ alembic upgrade head
```

## Шаблоны email
Шаблоны находятся в `./backend/app/email-templates/` и делятся на `src` (исходники) и `build` (готовые).  
Для работы нужен плагин [MJML](https://marketplace.visualstudio.com/items?itemName=attilabuti.vscode-mjml).  

1. Создай новый `.mjml` в `src/`.  
2. Через палитру команд выбери **MJML: Export to HTML**.  
3. Сохрани сгенерированный `.html` в `build/`.
