import json
import os

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

DATA_DIR = os.path.join(
    BASE_DIR,
    "..",
    "data"
)

USERS_FILE = os.path.join(
    DATA_DIR,
    "users.json"
)


def load_users():

    os.makedirs(
        DATA_DIR,
        exist_ok=True
    )

    if not os.path.exists(USERS_FILE):

        with open(
            USERS_FILE,
            "w",
            encoding="utf-8"
        ) as f:

            json.dump({}, f)

    try:

        with open(
            USERS_FILE,
            "r",
            encoding="utf-8"
        ) as f:

            return json.load(f)

    except:

        return {}


def save_users(users):

    os.makedirs(
        DATA_DIR,
        exist_ok=True
    )

    with open(
        USERS_FILE,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            users,
            f,
            ensure_ascii=False,
            indent=4
        )


def register_user(username, password):

    users = load_users()

    username = username.strip()

    password = password.strip()

    if username in users:

        return None

    users[username] = {

        "password": password,

        "avatar": ""
    }

    save_users(users)

    return {

        "username": username
    }


def login_user(username, password):

    users = load_users()

    username = username.strip()

    password = password.strip()

    if username not in users:

        return None

    if users[username]["password"] != password:

        return None

    return {

        "username": username,

        "avatar":
            users[username].get(
                "avatar",
                ""
            )
    }


def get_user(username):

    users = load_users()

    if username not in users:

        return None

    return {

        "username": username,

        "avatar":
            users[username].get(
                "avatar",
                ""
            )
    }


def update_avatar(username, avatar):

    users = load_users()

    if username not in users:

        return

    users[username]["avatar"] = avatar

    save_users(users)