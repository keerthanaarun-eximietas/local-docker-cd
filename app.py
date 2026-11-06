from pathlib import Path

from flask import Flask, jsonify, send_from_directory

BASE_DIR = Path(__file__).resolve().parent
FRONTEND_DIST = BASE_DIR / "frontend" / "dist"

app = Flask(
    __name__,
    static_folder=str(FRONTEND_DIST),
    static_url_path="",
)


@app.route("/")
def home():
    return send_from_directory(FRONTEND_DIST, "index.html")


@app.route("/health")
def health():
    return jsonify(
        status="ok",
        service="Local Docker CD Demo"
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)