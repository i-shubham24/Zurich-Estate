from PIL import Image
import numpy as np

def make_black(filepath, size=None):
    img = Image.open('src/app/icon.png').convert('RGBA')
    if size:
        img = img.resize(size, Image.Resampling.LANCZOS)
    
    data = np.array(img)
    
    # We want to change the RGB channels to black (0,0,0) for all pixels,
    # but preserve the alpha channel completely.
    r, g, b, a = data.T
    
    # Set RGB to 0 everywhere
    data[..., 0] = 0
    data[..., 1] = 0
    data[..., 2] = 0
    
    out = Image.fromarray(data)
    if filepath.endswith('.ico'):
        out.save(filepath, format='ICO')
    else:
        out.save(filepath)

# Overwrite existing icons with black versions
make_black('src/app/icon.png', (512, 512))
make_black('src/app/apple-icon.png', (180, 180))
make_black('src/app/favicon.ico', (32, 32))
