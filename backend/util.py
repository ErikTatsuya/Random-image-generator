import os
import shutil

def organize():
    images = []
    files = os.listdir("./")

    for i in range(len(files)):
        if files[i].endswith(".jpg") or files[i].endswith(".png"):
            images.append(files[i])

    for i in range(len(images)):
        shutil.move(images[i], f"./images/{images[i]}")

    print("sucess")

def clear():
    files = os.listdir("./images")

    for i in range(len(files)):
        os.remove(f"./images/{files[i]}")

    print("sucess")


while True:
    option = input("organize || clear: ")
    if option == "organize":
        organize()
        break
    elif option == "clear":
        clear()
        break
    else:
        print("invalid option")