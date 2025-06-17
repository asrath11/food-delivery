from app import create_app


app = create_app()


@app.route("/")
def home():
    return "hello it is home page"


if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
