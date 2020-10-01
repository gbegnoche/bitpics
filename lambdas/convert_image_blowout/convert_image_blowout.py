from PIL import Image

def convert_image_blowout(img):
	finalimg = img
	for x in range(img.size[0]):
		for y in range(img.size[1]):
			pxl = img.getpixel((x, y))
			newpxl = [0, 0, 0]
			for z in range(0, 3):
				if (pxl[z] > 128):
					newpxl[z] = 255
				else:
					newpxl[z] = 0
			finalimg.putpixel((x, y), tuple(newpxl))        
	return finalimg
