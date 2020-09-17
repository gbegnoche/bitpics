from PIL import Image

def convert_image_pixelate(img, pixelsize):
    img = img.resize((img.size[0] - (img.size[0] % pixelsize), img.size[1] - (img.size[1] % pixelsize)))
    finalim = Image.new("RGBA", img.size)

    for x in range(0, img.size[0], pixelsize):
        for y in range(0, img.size[1], pixelsize):
            r = 0
            g = 0
            b = 0
            ctr = 0
            for xx in range(x, x + pixelsize):
                for yy in range(y, y + pixelsize):
                    pxl = img.getpixel((xx, yy))
                    r += pxl[0]
                    g += pxl[1]
                    b += pxl[2]
                    ctr += 1
            r = r // ctr
            g = g // ctr
            b = b // ctr
            pixel = Image.new("RGBA", (pixelsize, pixelsize), (r, g, b))
            finalim.paste(pixel, (x, y))

    return finalim