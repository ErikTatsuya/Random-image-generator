from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import sizeCalculator
import imageGenerator
import os

app = FastAPI()


@app.get("/")
def root():
    return {"message": "hello world"}

@app.get("/getAllimages")
async def getAllFiles():
    images = os.listdir("./images")
    
    img_png = []
    img_jpg = []
    for img in images:
        if img.endswith(".png"):
            img_png.append(img)
        elif img.endswith(".jpg"):
            img_jpg.append(img)
    
    return {
        "total_files":{
            "*": len(images),
            "png": len(img_png),
            "jpg": len(img_jpg),
        },
        "total_size": {            
            "bytes": sizeCalculator.calculate_size()[0],
            "MB": sizeCalculator.calculate_size()[1],
        },
        "images": images,
    }

@app.get("/generateImages/{x}/{y}/{quantity}/{extension}")
async def generateImages(x: int, y: int, quantity: int, extension: str):
    image_names = imageGenerator.generateIMG(x, y, quantity, extension)
    return {
        "message": f"{quantity} images of size {x}x{y} with extension {extension} generated successfully.",
        "image_names": image_names
    }

app.mount("/images", StaticFiles(directory="images"), name="images")

print("Server is running on http://localhost:8000")