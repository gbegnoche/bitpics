from PIL import Image, ImageColor
import time

def convert_image_1bit(img, tolerance = 1):
    finalim = Image.new("1", img.size)

    cnt = 0
    ttl = 0
    for x in range(img.size[0]):
        for y in range(img.size[1]):
            pix = img.getpixel((x, y))
            val = (pix[0] + pix[1] + pix[2]) / 3
            ttl += val
            cnt += 1

    avg = ttl / cnt

    for x in range(img.size[0]):
        for y in range(img.size[1]):
            pix = img.getpixel((x, y))
            val = (pix[0] + pix[1] + pix[2]) / (3 * tolerance)
            if val >= avg:
                finalim.putpixel((x, y), 0)
            else:
                finalim.putpixel((x, y), 1)

    return finalim

def convert_image_1bit_color(img, color1, color2, tolerance = 1):
    finalim = Image.new("RGBA", img.size)

    if (isinstance(color1, str)):
        color1 = ImageColor.getrgb(color1)
    if (isinstance(color2, str)):
        color2 = ImageColor.getrgb(color2)

    cnt = 0
    ttl = 0
    stepx = int(img.size[0] / 10)
    stepy = int(img.size[1] / 10)
    for x in range(0, img.size[0], stepx):
        for y in range(0, img.size[1], stepy):
            pix = img.getpixel((x, y))
            val = (pix[0] + pix[1] + pix[2]) / 3
            ttl += val
            cnt += 1

    avg = ttl / cnt

    for x in range(img.size[0]):
        for y in range(img.size[1]):
            pix = img.getpixel((x, y))
            val = (pix[0] + pix[1] + pix[2]) / (3 * tolerance)
            if val >= avg:
                finalim.putpixel((x, y), color1)
            else:
                finalim.putpixel((x, y), color2)

    return finalim

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

im = Image.open("skull2.jpg")

# final = convert_pixelated(im, 8)
final = convert_image_1bit_color(im, '#00FF00', '#000000', 1)
final.show()
