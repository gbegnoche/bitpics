import React, { useState, useRef, useEffect } from 'react';
import './PictureBox.css';
import axios from 'axios'

const PictureBox = () => {
	const [currentPic, setCurrentPic] = useState(new File([], 'none'));
	const picRef = useRef();

	useEffect(() => {
		updatePic(currentPic);
	});

	const dragOver = (e) => {
		e.preventDefault();
	}

	const dragEnter = (e) => {
		e.preventDefault();
	}

	const dragLeave = (e) => {
		e.preventDefault();
	}

	const drop = (e) => {
		e.preventDefault();
		const files = e.dataTransfer.files;
		if (files.length === 1) {
			handleFile(files[0]);
		} else {
			alert('one file at a time please')
		}
	}

	const handleFile = (file) => {
		const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
		if (supportedTypes.indexOf(file.type) !== -1) {
			setCurrentPic(file);
		}
	}

	const updatePic = (file) => {
		const reader = new FileReader();
		if (file.size > 0) {
			reader.readAsDataURL(file);
			reader.onload = function(e) {
				// console.log(reader.result);
				setCurrentPic(reader.result);
				picRef.current.style.backgroundImage = `url(${e.target.result})`;
			}
		}
	}

	const receiveImage = (base64) => {
		console.log(`url(data:image/png;base64,${base64})`)
		picRef.current.style.backgroundImage = `url(data:image/jpeg;base64,${base64})`;
	}

	const click1Bit = async (e) => {
		const URL = 'https://1kuxdq4rzi.execute-api.us-east-2.amazonaws.com/prod/convert-image-1bit';
		await axios.post(
			URL,
			currentPic
		).then((result) => {
			receiveImage(result.data);
			console.log(result);
		}).catch((error) => {
			console.log(error);
		});
	}

	return (
		<div>
			<div className="container"
				onDragOver={dragOver}
				onDragEnter={dragEnter}
				onDragLeave={dragLeave}
				onDrop={drop}
			>
				<div className="pic-container" ref={picRef}></div>
			</div>
			<div>
				<button onClick={click1Bit} type="button">1-bit</button>
				<button>pixelate</button>
			</div>
		</div>
	)
}

export default PictureBox;

//event:  {'resource': '/convert-image-1bit', 'path': '/convert-image-1bit', 'httpMethod': 'GET', 'headers': {'accept': 'application/json, text/plain, */*', 'accept-encoding': 'gzip, deflate, br', 'accept-language': 'en-US,en-GB;q=0.9,en;q=0.8,ru-RU;q=0.7,ru;q=0.6', 'dnt': '1', 'Host': '1kuxdq4rzi.execute-api.us-east-2.amazonaws.com', 'origin': 'http://localhost:3000', 'referer': 'http://localhost:3000/', 'sec-fetch-dest': 'empty', 'sec-fetch-mode': 'cors', 'sec-fetch-site': 'cross-site', 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36', 'X-Amzn-Trace-Id': 'Root=1-5f627fbf-824d6b625e70620060987c98', 'X-Forwarded-For': '67.241.55.196', 'X-Forwarded-Port': '443', 'X-Forwarded-Proto': 'https'}, 'multiValueHeaders': {'accept': ['application/json, text/plain, */*'], 'accept-encoding': ['gzip, deflate, br'], 'accept-language': ['en-US,en-GB;q=0.9,en;q=0.8,ru-RU;q=0.7,ru;q=0.6'], 'dnt': ['1'], 'Host': ['1kuxdq4rzi.execute-api.us-east-2.amazonaws.com'], 'origin': ['http://localhost:3000'], 'referer': ['http://localhost:3000/'], 'sec-fetch-dest': ['empty'], 'sec-fetch-mode': ['cors'], 'sec-fetch-site': ['cross-site'], 'User-Agent': ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36'], 'X-Amzn-Trace-Id': ['Root=1-5f627fbf-824d6b625e70620060987c98'], 'X-Forwarded-For': ['67.241.55.196'], 'X-Forwarded-Port': ['443'], 'X-Forwarded-Proto': ['https']}, 'queryStringParameters': None, 'multiValueQueryStringParameters': None, 'pathParameters': None, 'stageVariables': None, 'requestContext': {'resourceId': '1nrwjw', 'resourcePath': '/convert-image-1bit', 'httpMethod': 'GET', 'extendedRequestId': 'S-jl5H7ziYcFnaw=', 'requestTime': '16/Sep/2020:21:12:31 +0000', 'path': '/prod/convert-image-1bit', 'accountId': '281073515130', 'protocol': 'HTTP/1.1', 'stage': 'prod', 'domainPrefix': '1kuxdq4rzi', 'requestTimeEpoch': 1600290751218, 'requestId': 'db16b0b4-6b42-4373-8b7c-3050a360fde9', 'identity': {'cognitoIdentityPoolId': None, 'accountId': None, 'cognitoIdentityId': None, 'caller': None, 'sourceIp': '67.241.55.196', 'principalOrgId': None, 'accessKey': None, 'cognitoAuthenticationType': None, 'cognitoAuthenticationProvider': None, 'userArn': None, 'userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36', 'user': None}, 'domainName': '1kuxdq4rzi.execute-api.us-east-2.amazonaws.com', 'apiId': '1kuxdq4rzi'}, 'body': None, 'isBase64Encoded': False}
//event:  {'resource': '/convert-image-1bit', 'path': '/convert-image-1bit', 'httpMethod': 'POST', 'headers': {'accept': 'application/json, text/plain, */*', 'accept-encoding': 'gzip, deflate, br', 'accept-language': 'en-US,en-GB;q=0.9,en;q=0.8,ru-RU;q=0.7,ru;q=0.6', 'content-type': 'application/json;charset=UTF-8', 'dnt': '1', 'Host': '1kuxdq4rzi.execute-api.us-east-2.amazonaws.com', 'origin': 'http://localhost:3000', 'referer': 'http://localhost:3000/', 'sec-fetch-dest': 'empty', 'sec-fetch-mode': 'cors', 'sec-fetch-site': 'cross-site', 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36', 'X-Amzn-Trace-Id': 'Root=1-5f628885-295228aa69b43c33882f97f2', 'X-Forwarded-For': '67.241.55.196', 'X-Forwarded-Port': '443', 'X-Forwarded-Proto': 'https'}, 'multiValueHeaders': {'accept': ['application/json, text/plain, */*'], 'accept-encoding': ['gzip, deflate, br'], 'accept-language': ['en-US,en-GB;q=0.9,en;q=0.8,ru-RU;q=0.7,ru;q=0.6'], 'content-type': ['application/json;charset=UTF-8'], 'dnt': ['1'], 'Host': ['1kuxdq4rzi.execute-api.us-east-2.amazonaws.com'], 'origin': ['http://localhost:3000'], 'referer': ['http://localhost:3000/'], 'sec-fetch-dest': ['empty'], 'sec-fetch-mode': ['cors'], 'sec-fetch-site': ['cross-site'], 'User-Agent': ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36'], 'X-Amzn-Trace-Id': ['Root=1-5f628885-295228aa69b43c33882f97f2'], 'X-Forwarded-For': ['67.241.55.196'], 'X-Forwarded-Port': ['443'], 'X-Forwarded-Proto': ['https']}, 'queryStringParameters': None, 'multiValueQueryStringParameters': None, 'pathParameters': None, 'stageVariables': None, 'requestContext': {'resourceId': '1nrwjw', 'resourcePath': '/convert-image-1bit', 'httpMethod': 'POST', 'extendedRequestId': 'S-pE6F5-iYcF8gw=', 'requestTime': '16/Sep/2020:21:49:57 +0000', 'path': '/prod/convert-image-1bit', 'accountId': '281073515130', 'protocol': 'HTTP/1.1', 'stage': 'prod', 'domainPrefix': '1kuxdq4rzi', 'requestTimeEpoch': 1600292997797, 'requestId': '594851a3-c78e-47c9-a015-48147548dc8e', 'identity': {'cognitoIdentityPoolId': None, 'accountId': None, 'cognitoIdentityId': None, 'caller': None, 'sourceIp': '67.241.55.196', 'principalOrgId': None, 'accessKey': None, 'cognitoAuthenticationType': None, 'cognitoAuthenticationProvider': None, 'userArn': None, 'userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36', 'user': None}, 'domainName': '1kuxdq4rzi.execute-api.us-east-2.amazonaws.com', 'apiId': '1kuxdq4rzi'}, 'body': '{"name":"Fred","age":23}', 'isBase64Encoded': False}
