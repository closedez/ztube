from flask import Blueprint
from flask import jsonify
from flask import request
from flask import send_from_directory

import os
import uuid

from auth.service import (
    register_user,
    login_user,
    get_user,
    update_avatar
)

auth_bp = Blueprint(
    "auth",
    __name__
)

UPLOAD_FOLDER = os.path.join(
    os.getcwd(),
    "uploads",
    "videos"
)

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


@auth_bp.route(
    "/api/register",
    methods=["POST"]
)
def register():

    data = request.json

    user = register_user(
        data["username"],
        data["password"]
    )

    if not user:

        return jsonify({
            "error":
                "Пользователь существует"
        }), 400

    return jsonify({
        "message":
            "Аккаунт создан"
    })


@auth_bp.route(
    "/api/login",
    methods=["POST"]
)
def login():

    data = request.json

    user = login_user(
        data["username"],
        data["password"]
    )

    if not user:

        return jsonify({
            "error":
                "Неверный логин"
        }), 400

    return jsonify(user)


@auth_bp.route(
    "/api/user/<username>"
)
def user(username):

    return jsonify(
        get_user(username)
    )


@auth_bp.route(
    "/api/avatar",
    methods=["POST"]
)
def avatar():

    username = request.form.get(
        "username"
    )

    avatar = request.files.get(
        "avatar"
    )

    if not avatar:

        return jsonify({
            "error":
                "Нет файла"
        }), 400

    ext = avatar.filename.split(".")[-1]

    filename = (
        f"{uuid.uuid4()}.{ext}"
    )

    avatar.save(

        os.path.join(
            UPLOAD_FOLDER,
            filename
        )
    )

    update_avatar(
        username,
        filename
    )

    return jsonify({

        "message":
            "Аватар обновлен",

        "avatar":
            filename
    })


@auth_bp.route(
    "/api/avatar/view/<filename>"
)
def view_avatar(filename):

    return send_from_directory(
        UPLOAD_FOLDER,
        filename
    )