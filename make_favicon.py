from PIL import Image

# Load the transparent logo
img = Image.open('public/brand/real-logo-transparent.png').convert('RGBA')
w, h = img.size

# The logo is 916x220. The OI is on the left.
# We'll crop a square of 250x220 from the left, then make it a perfect square.
crop_width = min(w, int(h * 1.2)) # ~264px
cropped = img.crop((0, 0, crop_width, h))

# Now create a square canvas to center it, or just use it.
# The 'OI' is probably slightly narrower than the height.
# Let's actually find the bounding box of the non-transparent pixels in the cropped area!
bbox = cropped.getbbox()
if bbox:
    cropped = cropped.crop(bbox)

# Now we have the tight 'OI'. Make a square canvas with some padding.
cw, ch = cropped.size
size = max(cw, ch)
padding = int(size * 0.15)
final_size = size + padding * 2

square = Image.new('RGBA', (final_size, final_size), (0,0,0,0))
# Paste it centered
offset_x = (final_size - cw) // 2
offset_y = (final_size - ch) // 2
square.paste(cropped, (offset_x, offset_y), cropped)

# Save as icon.png and apple-icon.png
square.resize((512, 512), Image.Resampling.LANCZOS).save('src/app/icon.png')
square.resize((180, 180), Image.Resampling.LANCZOS).save('src/app/apple-icon.png')

# Create a simple favicon.ico (32x32)
square.resize((32, 32), Image.Resampling.LANCZOS).save('src/app/favicon.ico', format='ICO')
