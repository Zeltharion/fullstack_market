# RANEPA Auth Backend

Backend часть системы аутентификации и авторизации, реализующая безопасное API с двойной CSRF-защитой.

## 🛠️ Технологии

- **Node.js** - серверная платформа
- **Express** - веб-фреймворк
- **TypeScript** - типизация
- **TypeORM** - ORM для работы с базой данных
- **CSRF-CSRF** - защита от CSRF-атак
- **JWT** - токены для аутентификации

## 🔒 Безопасность

### CSRF Protection
```typescript
const { doubleCsrfProtection, generateToken } = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET || 'your-csrf-secret-key',
    cookieName: 'csrf',
    cookieOptions: {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
    },
    getTokenFromRequest: (req) => req.cookies['csrf'],
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
})
```

## 📁 Структура проекта

```
src/
├── config/       # Конфигурация приложения
├── controllers/  # Контроллеры
├── entities/     # Модели данных
├── middleware/   # Middleware
├── routes/       # Маршруты
└── services/     # Бизнес-логика
```

## 🚀 Запуск проекта

1. Установите зависимости:
```bash
npm install
```

2. Создайте `.env` файл:
```
PORT=3000
FRONTEND_URL=http://localhost:8080
CSRF_SECRET=your-csrf-secret
JWT_SECRET=your-jwt-secret
```

3. Запустите проект:
```bash
npm run dev
```

## 📝 API Endpoints

### Аутентификация
- `POST /api/auth/register` - регистрация пользователя
- `POST /api/auth/login` - вход в систему
- `POST /api/auth/logout` - выход из системы
- `GET /api/auth/me` - получение данных текущего пользователя

### CSRF Protection
- `GET /api/csrf-token` - получение CSRF-токена

## 🔧 Скрипты

- `npm run dev` - запуск в режиме разработки
- `npm run build` - сборка проекта
- `npm run start` - запуск в production режиме
