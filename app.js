// express - 호스팅 세팅
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const fs = require('fs');

const PORT = 3000;

// 서버 열기 
server.listen(PORT, () => {
  console.log('listening on *:' + PORT);
});

// 웹 호스팅 경로 설정
app.use(express.static(__dirname + '/src'));
app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({limit: '200mb', extended: true}));

// index 경로 접속
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

// 데이터 요청 처리
app.post('/save', function(req, res){
    let dataToWrite = JSON.stringify(req.body.message, null, 2);
    fs.writeFile(__dirname + '/data.json', dataToWrite, function(err){
        console.log('파일 저장 완료');
        res.sendStatus(200);
    })
})

app.post('/get', function(req, res){
    fs.readFile(__dirname + '/data.json', 'utf8', function(err, dataRead){
        console.log('파일 읽기 완료');
        res.send(JSON.parse(dataRead));
    });
})

app.post('/add', function(req, res){
    fs.readFile(__dirname + '/data.json', 'utf8', function(err, dataRead){
        let json = JSON.parse(dataRead);
        json.list.push(req.body.message);
        let dataToWrite = JSON.stringify(json, null, 2);

        fs.writeFile(__dirname + '/data.json', dataToWrite, function(err){
            console.log('파일 저장 완료');
            res.sendStatus(200);
        })
    });

    
})