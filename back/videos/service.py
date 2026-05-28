import json
import os
import uuid

VIDEOS_FILE = "data/videos.json"
USERS_FILE = "data/users.json"


def load_videos():
    if not os.path.exists(VIDEOS_FILE):
        with open(VIDEOS_FILE, "w", encoding="utf-8") as f:
            json.dump([], f)
    with open(VIDEOS_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except:
            return []


def save_videos(videos):
    with open(VIDEOS_FILE, "w", encoding="utf-8") as f:
        json.dump(videos, f, ensure_ascii=False, indent=4)


def load_users():
    if not os.path.exists(USERS_FILE):
        return {}
    with open(USERS_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except:
            return {}


def get_videos():
    videos = load_videos()
    users = load_users()
    for video in videos:
        username = video.get("author")
        if username in users:
            video["avatar"] = users[username].get("avatar", "")
        else:
            video["avatar"] = ""
        if "likes" not in video:
            video["likes"] = 0
        if "dislikes" not in video:
            video["dislikes"] = 0
        if "liked_by" not in video:
            video["liked_by"] = []
        if "disliked_by" not in video:
            video["disliked_by"] = []
    return videos


def add_video(video):
    videos = load_videos()
    video["id"] = str(uuid.uuid4())
    video["likes"] = 0
    video["dislikes"] = 0
    video["liked_by"] = []
    video["disliked_by"] = []
    video["avatar"] = ""
    videos.append(video)
    save_videos(videos)


def delete_video(video_id):
    videos = load_videos()
    videos = [video for video in videos if video["id"] != video_id]
    save_videos(videos)


def like_video(video_id, username):
    videos = load_videos()
    for video in videos:
        if video["id"] == video_id:
            if username in video.get("liked_by", []):
                video["liked_by"].remove(username)
            else:
                video.setdefault("liked_by", []).append(username)
                if username in video.get("disliked_by", []):
                    video["disliked_by"].remove(username)
            video["likes"] = len(video.get("liked_by", []))
            video["dislikes"] = len(video.get("disliked_by", []))
    save_videos(videos)


def dislike_video(video_id, username):
    videos = load_videos()
    for video in videos:
        if video["id"] == video_id:
            if username in video.get("disliked_by", []):
                video["disliked_by"].remove(username)
            else:
                video.setdefault("disliked_by", []).append(username)
                if username in video.get("liked_by", []):
                    video["liked_by"].remove(username)
            video["likes"] = len(video.get("liked_by", []))
            video["dislikes"] = len(video.get("disliked_by", []))
    save_videos(videos)