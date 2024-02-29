const http = require('http');
const express = require('express');
const router = express.Router();
let cookieParser = require('cookie-parser'); // ��Ű���� �ٷ�� ���� �ʿ��� ���
let path = require('path'); // ������Ʈ ���ο���, ���ϵ��� ����θ�  ���� ���
const fs = require('fs');
const axios = require("axios");

// ���⼭ ���� app��ü�� ��� ��û�������� ������
const app = express();

// �� �������� �� ���� ����. �츮�� ejs ���.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app��ü�� �ܺ� ����� ����� �� �ֵ���, app.use(���)�� ����
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('static'));

let indexRouter = require("./routes/index");

router.get('/img/southKoreaHigh.svg', function(req, res){
    var imgName = req.params.imageName;
    console.log('�̹��� ��û: ' + imgName);
    res.sendFile('/static/img/'+imgName);    
  });

app.use('/', indexRouter);

// app��ü�� ������ server��ü�� ����
const server = http.createServer(app);

const hostname = 'localhost';
const port = 3000;
// hostname, port�� ���� server��ü�� listen�ϱ� ������.
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

// ������ ���� app ��ü�� ���ȭ�Ͽ� �ٸ� ���ϵ�� ������ �� �ֵ��� ��.
module.exports = app;
