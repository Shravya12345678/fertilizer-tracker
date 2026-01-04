import os
import shutil
import random

# --- CONFIGURATION ---
SOURCE_DIR = r"C:\Users\Hp\PlantVillage-Dataset\raw\color"
DEST_DIR = r"C:\Users\Hp\Desktop\datasets\selected_plant_images\corn" # Direct to corn folder
IMAGES_PER_CATEGORY = 10 

# Only the two missing categories
MISSING_CORN_CATEGORIES = [
    'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot'
]

def copy_missing_corn():
    # Ensure the corn destination folder exists
    if not os.path.exists(DEST_DIR):
        os.makedirs(DEST_DIR)
        print(f"Created directory: {DEST_DIR}")

    copied_count = 0
    
    for category in MISSING_CORN_CATEGORIES:
        source_path = os.path.join(SOURCE_DIR, category)
        
        if not os.path.exists(source_path):
            print(f"⚠️ Still cannot find: {source_path}")
            print("Please double check the folder name for extra spaces at the end.")
            continue
        
        # Get list of images
        image_files = [f for f in os.listdir(source_path) 
                      if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
        
        if not image_files:
            print(f"⚠️ No images found in: {category}")
            continue

        # Pick 10
        num_to_select = min(IMAGES_PER_CATEGORY, len(image_files))
        selected_files = random.sample(image_files, num_to_select)
        
        for img_file in selected_files:
            src_file_path = os.path.join(source_path, img_file)
            
            # Create a clean filename
            category_suffix = category.split('___')[-1].strip('_').replace(' ', '_')
            new_filename = f"corn_{category_suffix}_{img_file}"
            dest_file_path = os.path.join(DEST_DIR, new_filename)
            
            shutil.copy2(src_file_path, dest_file_path)
            copied_count += 1
            
        print(f"✅ Successfully copied {num_to_select} images from {category}")

    print(f"\nFinished! Added {copied_count} new images to your corn folder.")

if __name__ == "__main__":
    copy_missing_corn()