import os
import uuid
import cv2  # Added missing OpenCV import

from flask import Blueprint, jsonify, request, send_from_directory
from videos.service import (
    get_videos,
    add_video,
    like_video,
    dislike_video
)

videos_bp = Blueprint("videos", __name__)
UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads", "videos")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@videos_bp.route("/api/videos")
def videos():
    return jsonify(get_videos())


@videos_bp.route("/api/videos/like/<video_id>", methods=["POST"])
def like(video_id):
    data = request.json
    username = data.get("username")
    if not username:
        return jsonify({"error": "Username is required"}), 400
    like_video(video_id, username)
    return jsonify({"message": "Лайк обновлён"})


@videos_bp.route("/api/videos/dislike/<video_id>", methods=["POST"])
def dislike(video_id):
    data = request.json
    username = data.get("username")
    if not username:
        return jsonify({"error": "Username is required"}), 400
    dislike_video(video_id, username)
    return jsonify({"message": "Дизлайк обновлён"})


@videos_bp.route("/api/upload", methods=["POST"])
def upload():
    title = request.form.get("title")
    author = request.form.get("author")
    video_file = request.files.get("video")
    thumbnail = request.files.get("thumbnail")

    if not title or not author or not video_file:
        return jsonify({"error": "Заполните поля"}), 400

    video_ext = video_file.filename.split(".")[-1]
    video_filename = f"{uuid.uuid4()}.{video_ext}"
    video_file.save(os.path.join(UPLOAD_FOLDER, video_filename))

    thumbnail_filename = ""

    # Fixed indentation below
    if not thumbnail:
        try:
            video_path_full = os.path.join(UPLOAD_FOLDER, video_filename)
            cap = cv2.VideoCapture(video_path_full)
            ret, frame = cap.read()
            cap.release()

            if ret:
                thumb_filename = f"{uuid.uuid4()}.jpg"
                thumb_path = os.path.join(UPLOAD_FOLDER, thumb_filename)
                cv2.imwrite(thumb_path, frame)
                thumbnail_filename = thumb_filename

        except Exception as e:
            print("Ошибка при генерации превью:", e)
            thumbnail_filename = ""

    if thumbnail:
        thumb_ext = thumbnail.filename.split(".")[-1]
        thumbnail_filename = f"{uuid.uuid4()}.{thumb_ext}"
        thumbnail.save(os.path.join(UPLOAD_FOLDER, thumbnail_filename))

    add_video({
        "title": title,
        "author": author,
        "filename": video_filename,
        "thumbnail": thumbnail_filename
    })

    return jsonify({"message": "Видео загружено"})


@videos_bp.route("/api/stream/<filename>")
def stream(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
