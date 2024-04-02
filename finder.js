const http = require("https");

//Blooket headers always need a cookie. I'm not sure whether these cookies will ever expire.
let heads = {
	"accept": "application/json, text/plain, */*",
	"accept-language": "en-GB,en;q=0.9",
	"content-type": "application/json",
	"cookie": "bsid=MTcxMjA3Mjg4NXxpTDV5UHI2eThXTWV3bnc5bWhGRTRFcmlxRUFjSms0emJjNjYxb20xOGUwblp1MFBpNTFJemViN1h4Zz18Imre2iYvGUdT6aaaFqxQM3H8HFalOUQILiqBvs_9Hw0=",
	"origin": "https://goldquest.blooket.com",
	"referer": "https://goldquest.blooket.com/",
	"sec-ch-ua": '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
	"sec-ch-ua-mobile": "?0",
	"sec-ch-ua-platform": '"Linux"',
	"sec-fetch-dest": "empty",
	"sec-fetch-mode": "cors",
	"sec-fetch-site": "same-site",
	"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
}

setInterval(()=>{
	//I'm pretty sure blooket codes are always 7 digits long
	let id = Math.round(Math.random()*8999999)+1000000;

	//Ask blooket if it exists
	let req = http.request({
		method: "GET",
		path: "/c/firebase/id?id="+id,
		host: "fb.blooket.com",
		headers: heads,
	}, res=>{

		res.on("data", d=>{
			//Try to parse response
			try{
				d = JSON.parse(d.toString());
			} catch(exc){
				console.log("parse failure");
				return;
			}

			//Act accordingly to response
			if(d.success){
				console.log(id);
				process.exit();
			} else console.log("fail "+id);
		})

		//Prevent the "SOCKET HANGUP" crash
		res.on("error", e=>{
			console.log("Request Failed");
		})
	})

	//Send the request
	req.write("");
	req.end();
}, 100)
