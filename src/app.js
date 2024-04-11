// 외부 env 파일 사용
require('dotenv').config({path:'../.env'});
console.log("SERVER_HOST:", process.env.SERVER_HOST);
console.log("SERVER_PORT:", process.env.SERVER_PORT);

const API_HOST = process.env.API_HOST;
const API_PORT = process.env.API_PORT
console.log("API_SERVER:", API_HOST);
console.log("API_PORT:", API_PORT);

const http = require('http');
const express = require('express');
const router = express.Router();
let cookieParser = require('cookie-parser'); // 쿠키값을 다루기 위해 필요한 모듈
let path = require('path'); // 프로젝트 내부에서, 파일들의 상대경로를  위한 모듈
const fs = require('fs');
const axios = require("axios");
const await = require("await");
// 여기서 만든 app객체로 모든 요청·응답을 진행함
const app = express();


// 뷰 엔진으로 뭘 쓸지 정함. 우리는 ejs 사용.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app객체가 외부 모듈을 사용할 수 있도록, app.use(모듈)을 해줌
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('static'));

let indexRouter = require("./routes/index");


app.locals.getApiHost = function(value) {
  return API_SERVER;
};

app.locals.getApiPort = function(value) {
  return API_PORT; 
};


router.get('/img/southKoreaHigh.svg', function(req, res){
    var imgName = req.params.imageName;
    console.log('이미지 요청: ' + imgName);
    res.sendFile('/static/img/'+imgName);    
  });

app.use('/', indexRouter);

// app객체를 실행할 server객체를 만듦
const server = http.createServer(app);

const hostname = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;
// hostname, port에 대해 server객체가 listen하기 시작함.
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

// 위에서 정한 app 객체를 모듈화하여 다른 파일들과 소통할 수 있도록 함.
module.exports = app;
