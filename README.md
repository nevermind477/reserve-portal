# Reserve Portal

## Технологический стек и функции

- ⚡ [**FastAPI**](https://fastapi.tiangolo.com) для Python backend API.
    - 🧰 [SQLModel](https://sqlmodel.tiangolo.com) для работы с базой данных на Python SQL (ORM).
    - 🔍 [Pydantic](https://docs.pydantic.dev), используется в FastAPI для валидации данных и управления настройками.
    - 💾 [PostgreSQL](https://www.postgresql.org) как SQL-база данных.
- 🚀 [React](https://react.dev) для фронтенда.
    - 💃 Используются TypeScript, хуки, Vite и другие части современного фронтенд-стека.
    - 🎨 [Chakra UI](https://chakra-ui.com) для интерфейсных компонентов.
    - 🤖 Автоматически сгенерированный клиент для фронтенда.
    - 🧪 [Playwright](https://playwright.dev) для сквозного (E2E) тестирования.
    - 🦇 Поддержка тёмной темы.
- 🐋 [Docker Compose](https://www.docker.com) для разработки и продакшена.
- 🔒 Безопасное хеширование паролей по умолчанию.
- 🔑 Аутентификация через JWT (JSON Web Token).
- 📫 Восстановление пароля через email.
- ✅ Тесты на [Pytest](https://pytest.org).
- 📞 [Traefik](https://traefik.io) как обратный прокси / балансировщик нагрузки.
- 🚢 Инструкции по деплою с использованием Docker Compose, включая настройку фронтенд-прокси Traefik для автоматических HTTPS-сертификатов.
- 🏭 CI (непрерывная интеграция) и CD (непрерывный деплой) на базе GitHub Actions.

### Вход в панель управления

[![API docs](img/login.png)](https://github.com/fastapi/full-stack-fastapi-template)

### Панель управления – Админ

[![API docs](img/dashboard.png)](https://github.com/fastapi/full-stack-fastapi-template)

### Панель управления – Создание пользователя

[![API docs](img/dashboard-create.png)](https://github.com/fastapi/full-stack-fastapi-template)

### Панель управления – Элементы

[![API docs](img/dashboard-items.png)](https://github.com/fastapi/full-stack-fastapi-template)

### Панель управления – Настройки пользователя

[![API docs](img/dashboard-user-settings.png)](https://github.com/fastapi/full-stack-fastapi-template)

### Панель управления – Тёмная тема

[![API docs](img/dashboard-dark.png)](https://github.com/fastapi/full-stack-fastapi-template)

### Интерактивная документация API

[![API docs](img/docs.png)](https://github.com/fastapi/full-stack-fastapi-template)



### Обновление из оригинального шаблона

После клонирования и внесения изменений, вы можете захотеть подтянуть последние апдейты из оригинального шаблона.

- Убедитесь, что вы добавили оригинальный репозиторий как `remote`, проверьте командой:

```bash
git remote -v
```

- Вытяните последние изменения без коммита:

```bash
git pull --no-commit upstream master
```

- Разрешите конфликты (если будут) в редакторе.

- Завершите merge и закоммитьте:

```bash
git merge --continue
```

### Настройка

Обновите конфигурацию в `.env`, чтобы подстроить проект под себя.

Перед деплоем обязательно измените хотя бы:

- `SECRET_KEY`
- `FIRST_SUPERUSER_PASSWORD`
- `POSTGRES_PASSWORD`

Лучше передавать их через переменные окружения (secrets).

Подробнее см. в [deployment.md](deployment.md).

### Генерация секретных ключей

В `.env` по умолчанию есть значения `changethis`. Их нужно заменить на сгенерированные ключи:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Скопируйте и используйте это как пароль/секретный ключ. Для разных значений — запускайте команду несколько раз.

## Альтернативный способ — через Copier

Этот репозиторий также поддерживает генерацию проекта с помощью [Copier](https://copier.readthedocs.io).

Copier скопирует все файлы, задаст вопросы для конфигурации и обновит `.env` с вашими ответами.


## Backend Development

Документация по бэкенду: [backend/README.md](backend/README.md).

## Frontend Development

Документация по фронтенду: [frontend/README.md](frontend/README.md).

## Deployment

Инструкции по деплою: [deployment.md](deployment.md).

## Development

Общие инструкции по разработке: [development.md](development.md).

Включают использование Docker Compose, локальные домены, конфигурацию `.env` и др.

## Release Notes

Смотри файл [release-notes.md](release-notes.md).

