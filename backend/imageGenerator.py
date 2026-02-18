from PIL import Image, ImageDraw
import random
import sys

def generateIMG(x, y, quantity, extension):
    names = []
    
    for i in range(quantity):
        img = Image.new("RGB", (x, y), "white")
        draw = ImageDraw.Draw(img)

        for j in range(x):
            for k in range(y):
                colors = ["black", "red", "green", "blue", "yellow", "cyan", "magenta"]
                draw.point((j, k), fill=random.choice(colors))

        with open("index.txt", mode="r") as file:
            line = file.readline().strip()
            current_index = int(line)

        with open("index.txt", mode="w") as file:
            next_index = current_index + 1
            file.write(str(next_index))
            
        image_name = f"image_{next_index}.{extension}"
        img.save(f"./images/{image_name}")
        names.append(image_name)
    

    return names

def main():
    if len(sys.argv) != 5:
        print(f"Usage: python {sys.argv[0]} <x> <y> <quantity> <extension>")
        sys.exit(1)

    x = int(sys.argv[1])
    y = int(sys.argv[2])
    quantity = int(sys.argv[3])
    extension = sys.argv[4]

    generateIMG(x, y, quantity, extension)

if __name__ == "__main__":
    main()