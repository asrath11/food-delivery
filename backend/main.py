from waitress import serve
from app import create_app
from config import setting

app = create_app()
@app.route('/')
def index():
    return "Hello World"

if __name__ == "__main__":
    print(f"Production server started at http://127.0.0.1:{setting.port}")
    serve(app, host="127.0.0.1", port=setting.port, threads=6)