const http = require("http");
const fs = require('fs');
const login = fs.readFileSync('./public/login.html', 'UTF-8');

let express = require("express"); // package.json의 dependencies를 참조하여 express를 찾게 된다.
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let app = express();

const v1Router = require('./v1.js'); // module.exports로 지정된 객체 반환.

// middle-ware 사용해보기 __ app.use 순서가 중요하다!!!!!!!!!! 일반적으로 Router 위에 middleware를 적고
// err middleware의 경우는 Router 아래에 적는다.

// app.use((req, res, next) => {
//     req.on("data", (chunk)=>{
//         req.body += chunk; // data를 받는동안 할 행동.
//     });
//
//     req.on("end", ()=>{
//         console.log(req.body);
//         next();  // 다음 미들웨어한테 역할을 넘김.
//                 // next에 param이 있으면 error가 있다고 인식, err-middleware로 보낸다.
//     });
// });

// content-type에 따라서 달라진다...
// app.use(bodyParser.raw()); // image 등..
// app.use(bodyParser.text()); // text


app.use(bodyParser.urlencoded({extended: false}));
// application/urlencoded, option을 넣으려면 param내에 객체를 보낸다.
// urlencoded를 사용하면 해당 부분을 객체로 만들어서 관리하기 편하게 해준다.

app.use(bodyParser.json()); // application/json
app.use(cookieParser());

app.use('/v1', v1Router); // v1으로 들어온 url에 대해 v1Router를 사용하겠다는 의미.

app.get('/cookie', (req, res) => {
    // res.cookie("string", {name: "sample", property: "cookiecookie"}); // cookie(key, value);
    // let expires = new Date().toLocaleTimeString();
    // expires.setDate(date.getDate() + 1);
    res.cookie("string", "123123", {expires: new Date(Date.now() + 900000)}); // cookie(name, value, options);
    res.send("cookie set");
    // cookie를 set할 때는 그냥 res 사용,
    // cookie를 읽어서 사용해야하는 경우에는 cookie - parser를 사용.
});


// our_link :: http://localhost:4000/

// all에 쓰는것은 지양해야하지만 연습을 위해 우선... (( 뒤에 따라오는 함수가 일종의 middle-ware이다. ))
app.all("/", (req, res) => {
    console.log(req.cookies);
    res.send('<h1>Hello, this is the main page</h1>'); // 알아서 content-type을 txt/html으로 정해서 보내줌.
});
// '/'가 url로 들어왔을 때. (default url)

app.get("/login", (req, res) => {
    res.send(login);
});
// login url과 함께 request method가 get으로 들어왔을 때.

app.post("/login", (req, res) => {
    // let body = "";
    //
    // req.on("data", (chunk) => { // data를 받을 때 할 행동. ~~ 받은 데이터는 뒤의 chunk의 param이 되어 middle-ware 실행.
    //     body += chunk;
    // });
    //
    // req.on("end", () => { // data를 다 받은 뒤 행동.
    //     console.log(body);
    //     res.send(body);
    // });

    //middle-ware를 이용해 다음과 같이 사용 가능
    res.send(req.body);
});
// login url과 함께 request method가 post로 들어왔을 때.

app.use((err, req, res, next) => {

});

// app.put();
// app.delete();


const server = http.createServer(app); // Server 생성
server.listen(4000, () => {
    console.log('server is on');
});