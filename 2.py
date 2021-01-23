#to upload image
from flask import Flask, request, render_template, redirect
...
app = Flask(__name__)

@app.route("/upload-image", methods=["GET", "POST"])
def upload_image():
    if request.method == "POST":
        if request.files:
            image = request.files["image"]
            print(image)
            return redirect(request.url)
    return render_template("upload_image.html")

if __name__ == '__main__':
    app.run(debug=True)