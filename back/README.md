🎬 Video Platform

Современная веб-платформа для обмена видеоконтентом, вдохновленная функционалом YouTube.
Позволяет пользователям загружать видео, подписываться на каналы и взаимодействовать с контентом в реальном времени.

🚀 Основные возможности
👤 Пользователи
Аутентификация: Безопасный вход через JWT (JSON Web Tokens)
Профили: Настройка аватара, баннера, биографии и личных данных
Социальное взаимодействие: Подписки на каналы и просмотр их контента
🎥 Видео и Контент
Загрузка: Поддержка MP4 и кастомных превью (thumbnails)
Плеер: Собственный видеоплеер для комфортного просмотра
Реакции: Система лайков и дизлайков, интерактивные комментарии
Аналитика: Автоматический подсчет просмотров
🔍 Поиск и Навигация
Умный поиск: Поиск по названиям и описаниям с сохранением состояния в URL
Ленты: Умные рекомендации, новинки и раздел с подписками
🛠 Технологический стек
Слой	Технологии
Frontend	React 18, Tailwind CSS, Axios, React Router DOM, React Hot Toast
Backend	Django 5.0, Django REST Framework (DRF)
Безопасность	JWT Authentication, Django CORS Headers
База данных	SQLite (dev) / PostgreSQL (prod)
📂 Структура проекта
video-platform/
├─ backend/          # Django API сервер
│  ├─ users/         # Управление аккаунтами и профилями
│  ├─ videos/        # Логика работы с контентом
│  └─ media/         # Хранилище видео и изображений
├─ frontend/         # React SPA приложение
│  ├─ src/components/ # Переиспользуемые UI элементы
│  ├─ src/contexts/   # Управление глобальным состоянием
│  └─ src/pages/      # Маршрутизация и страницы
└─ README.md
⚡ Быстрый старт
🔹 Требования
Python 3.10+
Node.js 18+
🔹 Настройка бекенда
cd backend
python -m venv venv
source venv/bin/activate  # Для Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
🔹 Настройка фронтенда
cd frontend
npm install
npm start
🌐 Доступ по адресам
Frontend: http://localhost:3000
API Root: http://localhost:8000/api/
Admin Panel: http://localhost:8000/admin/