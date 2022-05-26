const { response } = require("express");
const express = require("express");
const Post = require("../schemas/post")
const router = express.Router();

router.get('/', (req, res) => {
    console.log(" Welcome to blog")
    
    res.send('./main.html'); // loading why??
});

router.get('/posts', async (req, res) => {
    const { name, title, content, password, postNum, postdate } = req.query;
    // find는 await , async와 한세트다.
    const posts = await Post.find({ name, title, content, password, postNum, postdate})
    .sort({"datafield": -1})
    console.log("posting count : ", posts.length)

    console.log('get: /posts')
    res.json({ posts, 'msg': '/api/posts routes show'});

});

router.post('/posts', async (req, res) => {

    // 개별 키-값 데이터를 받아온다.
    const {name, title, content, password, postNum, postdate} = req.body;

    await Post.create({ name, title, content, password, postNum, postdate});
    // 게시물 작성이니까 create
    res.json({ result: "success"});
})

router.delete("/post/:postNum", async (res, req) => {
    console.log("in delete");
    const {postNum} = req.params;

    const {password} = req.body;
    const existPost = await Post.find({ postNum: Number(postNum)});

    const deletepw = await Post.find({postNum: Number(postNum)}, {_id: 0, password: 1})
    console.log('db password:', deletepw[0].password)
    console.log('input password:', password)

    if(deletepw[0].password === password){
        if (existPost.length) {
            await Post.deleteOne({ postNum: Number(postNum)});
            res.json({ msg: 'delete'})
        } else {
            res.json( { msg: '비밀번호가 틀렸습니다.'})
        }
    }
})

router.put("/posts/:postNumber", async (req, res) => {
    const {postNum} = req.params;

    const {title, name, content, password} = req.body;
    console.log( title, name, content);

    const dbpw = await Post.find( {postNum:Number(postNum)}, {_id: 0, password:1} )
    console.log('디비 비밀번호:',dbpw[0].password)
    console.log('입력비번:',password)
    if(dbpw[0].password === password){
        if (existsPost.length) {
            await Post.updateOne({ postNum: Number(postNum) }, { $set: { title, name, content } });
            res.json({ msg: 'update'})
        }
    }else{
        res.json( {msg : '비밀번호 오류'} )
    }
})

module.exports = router;