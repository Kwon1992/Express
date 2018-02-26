const http = require("http");
const fs = require('fs');
const login = fs.readFileSync('./public/login.html', 'UTF-8');

let express = require("express"); // package.json의 dependencies를 참조하여 express를 찾게 된다.
let app = express();

const v1Router = require('./v1.js'); // module.exports로 지정된 객체 반환.

app.use('/v1', v1Router); // v1으로 들어온 url에 대해 v1Router를 사용하겠다는 의미.


// our_link :: http://localhost:4000/

// all에 쓰는것은 지양해야하지만 연습을 위해 우선... (( 뒤에 따라오는 함수가 일종의 middle-ware이다. ))
app.all("/", (req, res)=>{
    res.send('<h1>Hello, this is the main page</h1>'); // 알아서 content-type을 txt/html으로 정해서 보내줌.
});
// '/'가 url로 들어왔을 때. (default url)

app.get("/login",(req, res)=>{
    res.send(login);
});
// login url과 함께 request method가 get으로 들어왔을 때.

app.post("/login", (req, res)=>{
    let body = "";

    req.on("data", (chunk)=> { // data를 받을 때 할 행동. ~~ 받은 데이터는 뒤의 chunk의 param이 되어 middle-ware 실행.
        body += chunk;
    });

    req.on("end", ()=>{ // data를 다 받은 뒤 행동.
        console.log(body);
        res.send(body);
    });
});
// login url과 함께 request method가 post로 들어왔을 때.


// app.put();
// app.delete();



const server = http.createServer(app); // Server 생성
server.listen(4000, ()=>{
    console.log('server is on');
});