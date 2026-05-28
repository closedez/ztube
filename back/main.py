from flask import Flask
from flask_cors import CORS

from auth.routes import auth_bp
from videos.routes import videos_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(videos_bp)

if __name__ == "__main__":

    app.run(debug=True)