import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Папка для загрузки видео и превью
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads", "videos")

# Файлы данных
USERS_FILE = os.path.join(BASE_DIR, "data", "users.json")
VIDEOS_FILE = os.path.join(BASE_DIR, "data", "videos.json")
COMMENTS_FILE = os.path.join(BASE_DIR, "data", "comments.json")

# Создаем папку если не существует
os.makedirs(UPLOAD_FOLDER, exist_ok=True)