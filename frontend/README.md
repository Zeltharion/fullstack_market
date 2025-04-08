# RANEPA Auth Frontend

Frontend часть системы аутентификации и авторизации, построенная с использованием современных технологий и лучших практик разработки.

## 🛠️ Технологии

- **React 18** - современная библиотека для создания пользовательских интерфейсов
- **TypeScript** - типизация для большей надежности кода
- **MobX** - управление состоянием приложения
- **React Hook Form** - управление формами
- **Zod** - валидация данных
- **Axios** - HTTP-клиент
- **TailwindCSS** - утилитарный CSS-фреймворк

## 🔒 Безопасность

### CSRF Protection
```typescript
api.interceptors.request.use(async config => {
    if (config.url !== '/csrf-token') {
        try {
            await api.get('/csrf-token')
            const csrfToken = Cookies.get('csrf')
            if (csrfToken) {
                const [token] = csrfToken.split('|')
                config.headers['x-csrf-token'] = token
            }
        } catch (error) {
            console.error('Ошибка при получении CSRF-токена:', error)
        }
    }
    return config
})
```

## 📁 Структура проекта

```
src/
├── app/          # Инициализация приложения
├── features/     # Функциональные модули
├── shared/       # Переиспользуемый код
└── pages/        # Страницы приложения
```

## 🚀 Запуск проекта

1. Установите зависимости:
```bash
npm install
```

2. Создайте `.env` файл:
```
VITE_API_URL=http://localhost:3000/api
```

3. Запустите проект:
```bash
npm run dev
```

## 📝 Скрипты

- `npm run dev` - запуск в режиме разработки
- `npm run build` - сборка проекта
- `npm run prettier` - форматирование кода
