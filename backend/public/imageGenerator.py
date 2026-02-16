from PIL import Image, ImageDraw
import random

def generateIMG(size, quantity, extension):
    for i in range(quantity):
        img = Image.new("RGB", (size, size), "white")
        draw = ImageDraw.Draw(img)

    for j in range(size):
        for k in range(size):
            colors = ["black", "red", "green", "blue", "yellow", "cyan", "magenta"]
            draw.point((j, k), fill=random.choice(colors))

    img.save(f"./images/image_{i + 1}.{extension}")
