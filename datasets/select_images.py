import os
import shutil
import random

# --- CONFIGURATION ---
# Use the full absolute paths you provided
SOURCE_DIR = r"C:\Users\Hp\PlantVillage-Dataset\raw\color"
DEST_DIR = r"C:\Users\Hp\Desktop\datasets\selected_plant_images"
IMAGES_PER_CATEGORY = 10 

CROP_SELECTION = {
    'corn': [
        'Corn_(maize)___healthy',
        'Corn_(maize)___Northern_Leaf_Blight',
        'Corn_(maize)___Common_rust',
        'Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot'
    ],
    'grape': [
        'Grape___healthy',
        'Grape___Black_rot',
        'Grape___Esca_(Black_Measles)',
        'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)'
    ],
    'apple': [
        'Apple___healthy',
        'Apple___Apple_scab',
        'Apple___Black_rot',
        'Apple___Cedar_apple_rust'
    ],
    'tomato': [
        'Tomato___healthy',
        'Tomato___Early_blight',
        'Tomato___Late_blight',
        'Tomato___Leaf_Mold',
        'Tomato___Septoria_leaf_spot'
    ],
    'potato': [
        'Potato___healthy',
        'Potato___Early_blight',
        'Potato___Late_blight'
    ],
    'pepper': [
        'Pepper,_bell___healthy',
        'Pepper,_bell___Bacterial_spot'
    ]
}

def select_images():
    # Create main destination directory if it doesn't exist
    if not os.path.exists(DEST_DIR):
        os.makedirs(DEST_DIR)
        print(f"Created directory: {DEST_DIR}")

    total_copied = 0
    
    for crop_name, categories in CROP_SELECTION.items():
        print(f"\n--- Processing {crop_name.upper()} ---")
        
        # Ensure the destination subfolder (e.g., .../apple) exists
        crop_dest = os.path.join(DEST_DIR, crop_name)
        os.makedirs(crop_dest, exist_ok=True)
        
        for category in categories:
            source_path = os.path.join(SOURCE_DIR, category)
            
            if not os.path.exists(source_path):
                print(f"⚠️ Folder NOT found: {source_path}")
                continue
            
            # Get list of images
            image_files = [f for f in os.listdir(source_path) 
                          if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
            
            if not image_files:
                print(f"⚠️ No images found in: {category}")
                continue

            # Pick 10 or the maximum available
            num_to_select = min(IMAGES_PER_CATEGORY, len(image_files))
            selected_files = random.sample(image_files, num_to_select)
            
            for img_file in selected_files:
                src_file_path = os.path.join(source_path, img_file)
                
                # We rename the file slightly to prevent name collisions 
                # (e.g., apple_healthy_image1.jpg)
                category_suffix = category.split('___')[-1]
                new_filename = f"{crop_name}_{category_suffix}_{img_file}"
                dest_file_path = os.path.join(crop_dest, new_filename)
                
                shutil.copy2(src_file_path, dest_file_path)
                total_copied += 1
            
            print(f"✅ Copied {num_to_select} images from {category}")

    print(f"\n{'='*30}")
    print(f"DONE! Total images copied: {total_copied}")
    print(f"Check your folder at: {DEST_DIR}")

if __name__ == "__main__":
    select_images()