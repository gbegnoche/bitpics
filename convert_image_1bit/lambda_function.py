import json
from PIL import Image

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
    #print("event: ", event)
    #print(event['body'])
    convert_image_1bit(event['body'])
    
    return {
        'statusCode': 200,
        'body': json.dumps(event['body']),
        'headers': {
            "Access-Control-Allow-Headers" : "Content-Type,Access-Control-Allow-Origin",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
    }
