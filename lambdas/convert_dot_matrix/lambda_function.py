import json
from PIL import Image, ImageDraw
from io import BytesIO
import base64
import math

def reduceImage(img, maxSize = 600):
    finalImg = img
    x = img.size[0]
    y = img.size[1]
    if x > maxSize or y > maxSize:
        if img.size[0] >= img.size[1]:
            factor = maxSize / x
            finalImg = img.resize((maxSize, int(y * factor)))
    return finalImg

def convert_dot_matrix_color_pick(img, color1 = (0, 0, 0), color2 = (255, 255, 255), pixelsize = 7):
    img = img.resize((img.size[0] - (img.size[0] % pixelsize), img.size[1] - (img.size[1] % pixelsize)))
    finalimg = Image.new("RGBA", img.size, color1)
    draw = ImageDraw.Draw(finalimg)

    hi = 0
    lo = 255
    for x in range(img.size[0]):
        for y in range(img.size[1]):
            pix = img.getpixel((x, y))
            val = (pix[0] + pix[1] + pix[2]) / 3
            if val > hi:
                hi = val
            if val < lo:
                lo = val
    valrange = hi - lo

    for x in range(0, img.size[0], pixelsize):
        for y in range(0, img.size[1], pixelsize):
            dotavg = 0
            ctr = 0
            for xx in range(x, x + pixelsize):
                for yy in range(y, y + pixelsize):
                    pxl = img.getpixel((xx, yy))
                    dotavg += (pxl[0] + pxl[1] + pxl[2]) / 3
                    ctr += 1
            dotavg /= ctr

            circlesize = math.floor(9 * ((dotavg * (valrange / 255)) / 255))

            if circlesize == 1:
                draw.point((x + (pixelsize / 2), y + (pixelsize / 2)), color2)
            else:
                xx = x + math.floor((pixelsize / 2) - (circlesize / 2))
                yy = y + math.floor((pixelsize / 2) - (circlesize / 2))
                draw.ellipse([xx, yy, xx + circlesize, yy + circlesize], color2, color2)

    return finalimg

def lambda_handler(event, context):
    print(event)
    data = json.loads(event['body'])
    base64Bytes = data['image'].split(',')[1]
    image = Image.open(BytesIO(base64.b64decode(base64Bytes)))
    
    color1 = data['color1']
    color2 = data['color2']
    pixelsize = data['pixelsize']
    image = reduceImage(image)
    image = convert_dot_matrix_color_pick(image, color1, color2, pixelsize)
    
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode('utf')
    
    return {
        'statusCode': 200,
        'body': json.dumps(img_str),
        'headers': {
            "Access-Control-Allow-Headers" : "Content-Type,Access-Control-Allow-Origin",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
    }
