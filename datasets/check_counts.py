import os

# The path to your final dataset
DATASET_PATH = r"C:\Users\Hp\Desktop\datasets\selected_plant_images"

def check_dataset_balance():
    if not os.path.exists(DATASET_PATH):
        print("Dataset folder not found!")
        return

    print(f"{'Folder Name':<15} | {'Image Count':<12}")
    print("-" * 30)
    
    total = 0
    # Loop through each crop folder
    for folder in sorted(os.listdir(DATASET_PATH)):
        folder_path = os.path.join(DATASET_PATH, folder)
        
        if os.path.isdir(folder_path):
            # Count files that are images
            count = len([f for f in os.listdir(folder_path) 
                        if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
            print(f"{folder:<15} | {count:<12}")
            total += count

    print("-" * 30)
    print(f"{'TOTAL':<15} | {total:<12}")

if __name__ == "__main__":
    check_dataset_balance()