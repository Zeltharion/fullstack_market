# RANEPA Auth System

Веб-приложение для аутентификации и авторизации пользователей с повышенным уровнем безопасности. 
Проект реализует двойную защиту от CSRF-атак и использует современные практики разработки.

## 🛡️ Особенности безопасности

### Double CSRF Protection
- Использование библиотеки `csrf-csrf` для двойной защиты от CSRF-атак
- Автоматическая генерация и валидация CSRF-токенов
- Безопасное хранение токенов в куках с настройками `sameSite` и `secure`
- Проверка токенов на стороне сервера для каждого небезопасного запроса

## 🚀 Технологический стек

### Frontend
- React + TypeScript
- MobX для управления состоянием
- Axios для HTTP-запросов
- Zod для валидации форм
- TailwindCSS для стилизации

### Backend
- Node.js + Express
- TypeScript
- TypeORM для работы с базой данных
- JWT для аутентификации
- CSRF-CSRF для защиты от CSRF-атак

## 🏗️ Архитектура

### Frontend
- Feature-Sliced Design архитектура
- Модульная структура компонентов
- Переиспользуемые UI компоненты
- Типизированные API-запросы

### Backend
- Модульная архитектура
- Middleware для обработки запросов
- Service layer для бизнес-логики
- Repository pattern для работы с данными

## 🔒 Безопасность

- JWT токены для аутентификации
- Double CSRF Protection
- Secure cookies
- Rate limiting
- CORS protection
- Password hashing

## 📦 Установка и запуск

### Локальная разработка

1. Клонируйте репозиторий
2. Установите зависимости
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Создайте `.env` файлы в директориях frontend и backend

4. Запустите приложение
```bash
# Frontend
npm run dev

# Backend
npm run dev
```

### Docker

1. Убедитесь, что у вас установлены Docker и Docker Compose

2. Создайте `.env` файлы:

**frontend/.env**
```
VITE_API_URL=http://localhost:3000
```

**backend/.env**
```
PORT=3000
FRONTEND_URL=http://localhost:8080
CSRF_SECRET=your-csrf-secret
JWT_SECRET=your-jwt-secret
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=ranepa_auth
```

3. Соберите и запустите контейнеры:
```bash
# Сборка образов
docker-compose build

# Запуск контейнеров
docker-compose up -d

# Просмотр логов
docker-compose logs -f
```

4. Остановка контейнеров:
```bash
docker-compose down
```

### Доступ к приложению

- Frontend: http://localhost:8080
- Backend API: http://localhost:3000
- База данных: localhost:5432

## 🐳 Docker конфигурация

Проект использует три сервиса:

1. **Frontend** (React приложение)
   - Порт: 8080
   - Hot reload для разработки
   - Nginx для production

2. **Backend** (Node.js API)
   - Порт: 3000
   - Nodemon для разработки
   - PM2 для production

3. **PostgreSQL**
   - Порт: 5432
   - Persistent volume для данных
   - Автоматическая инициализация БД

## 📝 Переменные окружения

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

### Backend (.env)
```
PORT=3000
FRONTEND_URL=http://localhost:8080
CSRF_SECRET=your-csrf-secret
JWT_SECRET=your-jwt-secret
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=ranepa_auth
```
