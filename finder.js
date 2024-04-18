const http = require("https");
const WebSocket = require("ws").WebSocket;

//Blooket headers always need a cookie. I'm not sure whether these cookies will ever expire.
let heads = {
  "accept": "application/json, text/plain, */*",
  "content-type": "application/json",
  "origin": "https://play.blooket.com",
  "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
}

//Get Cookie
http.request({
  method: "GET",
  path: "/play",
  host: "play.blooket.com",
  headers: heads
}, res=>{
  //Start when cookie obtained
  heads.cookie = res.headers["set-cookie"];
  startReq();
}).write("")


function startReq(){
  let inv = setInterval(()=>{
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
  
        //Handle success
        if(d.success){
          console.log(id);
          process.exit();
        } 
        //Handle failure
        else console.log(d.msg+" "+id);
      })
  
      //Notify user if socket breaks
      res.on("error", e=>{
        console.log("Request Error");
      })
    })
  
    //Send the request
    req.write("");
    req.end();
  }, 100)
}
