const express = require("express");
const connect = require("./schemas"); //db연결함수 호출
const app = express();
const port = 3000;

connect();

const postRouter = require("./Routes/posts"); //route 연결

const reverseDate = ((req, res, next) => {
    console.log("Request URL", req.originalURL, "-", new Date())
    next();
})


app.use(express.urlencoded());
// 본문 데이터 객체전환을 위해서 사용
app.use(express.json());
// json형식을 Parser하기 위한 express.json
app.use(express.static("static"));
// css, js같은 정적 파일을 사용하기 위한 express.static
app.use(reverseDate);
// req한 URL과 시간을 표시하기 위해서 사용

app.use('/api', [postRouter]);

app.get("/", (req, res) => {
    res.send("Hello start page");
});


app.listen(port, () => {
    console.log(port, "blog포트로 서버가 열렸어요!");
});