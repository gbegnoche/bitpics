import json
from PIL import Image
from io import BytesIO
import base64

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

def lambda_handler(event, context):
    # event = { "body": "none" }
    print("event: ", event)
    print(event['body'])
    
    base64Bytes = event['body'].split(',')[1]
    image = Image.open(BytesIO(base64.b64decode(base64Bytes)))
    
    image = convert_image_1bit(image)
    
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode('utf')
    
    print("encoded: ", img_str)
    
    return {
        'statusCode': 200,
        'body': json.dumps(img_str),
        'headers': {
            "Access-Control-Allow-Headers" : "Content-Type,Access-Control-Allow-Origin",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
    }
