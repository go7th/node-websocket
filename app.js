let app = require('express')();
let http = require('http');
let WebSocket = require('ws');
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

let server = http.createServer(app);
let wss = new WebSocket.Server({server});
let AllUserData=[];
wss.on('connection', function connection(ws) {
 console.log('链接成功！');
 // console.log(ws);

 function CheckIsNew(Temp){
     for(var i=0;i<AllUserData.length;i++){
        if(Temp.id == AllUserData[i]['id']){
            return false;
        }
    }
    return true;
 }

// console.log(ws.userid);

 ws.on('message', function incoming(data) {
     /**
      * 把消息发送到所有的客户端
      * wss.clients获取所有链接的客户端
      */

     wss.clients.forEach(function each(client) {
         client.send("123213213");
     });

     Temp = JSON.parse(data);
     // console.log(Temp);
     if(CheckIsNew(Temp)){
         AllUserData.push({
             'id':Temp.id,
             'ws':ws
         });
         // console.log(AllUserData);
     }else{
         // console.log(1111111111);
         for(var i=0;i<AllUserData.length;i++){
             if(Temp.id == AllUserData[i]['id']){
                 // console.log(Temp.id);
                 // console.log(Temp.data);
                 AllUserData[i]['ws'].send("只发给你");
                 break;

             }
         }
     }
 });
});


server.listen(3000, function() {
  console.log('listening on *:3000');
});
