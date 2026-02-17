import os
import sys

def calculate_size():
    total_size = 0
    files = os.listdir("./images")

    for i in range(len(files)):
        total_size += os.path.getsize(f"./images/{files[i]}")

    Bytes = total_size
    MB = round(total_size / 1024**2, 3)
    
    return [Bytes, MB]

def main():
    size = calculate_size()
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <option>")
        sys.exit(1)

    option = str(sys.argv[1])

    if option == "Bytes":
        print(f"{size[0]} Bytes")

    elif option == "MB":
        print(f"{size[1]} MB")
    
    

if __name__ == "__main__":
    main()