import os

def save_code_to_txt(output_file="all_code.txt"):
    # Get the current directory where the script is located
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    with open(os.path.join(base_dir, output_file), "w", encoding="utf-8") as out_file:
        out_file.write(f"Code snapshot from: {base_dir}\n\n")
        
        # Walk through the directory recursively
        for root, dirs, files in os.walk(base_dir):
            # Skip virtual environment or hidden folders if needed
            dirs[:] = [d for d in dirs if not d.startswith(".") and d not in ["__pycache__"]]
            
            # Sort files for consistent output
            files.sort()
            
            for filename in files:
                if filename == output_file:
                    continue  # Skip the output file itself
                
                file_path = os.path.join(root, filename)
                relative_path = os.path.relpath(file_path, base_dir)
                
                out_file.write("=" * 80 + "\n")
                out_file.write(f"📄 File: {relative_path}\n")
                out_file.write("=" * 80 + "\n\n")
                
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        out_file.write(f.read())
                except Exception as e:
                    out_file.write(f"⚠️ Could not read file: {e}\n")
                
                out_file.write("\n\n")
        
    print(f"✅ All code has been saved to '{output_file}'")

if __name__ == "__main__":
    save_code_to_txt()
