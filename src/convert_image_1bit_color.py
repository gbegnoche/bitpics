from PIL import Image

def convert_image_1bit_color(img, color1, color2, tolerance = 1):
    finalim = Image.new("RGBA", img.size)

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
            #print("val: ", val)
            if val >= avg:
                finalim.putpixel((x, y), color1)
            else:
                finalim.putpixel((x, y), color2)

    return finalim