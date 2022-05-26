const express = require("express");
const Post = require("../schemas/post")
const router = express.Router();

router.get('/', (req, res) => {
    console.log(" Welcome to blog")
    
    res.send('./main.html'); // loading why??
});

let postIdPlus;

router.get('/posts', async (req, res) => {
    const { name, title, content, password, postId, postdate } = req.query;
    // find는 await , async와 한세트다.
    const posts = await Post.find({ name, title, content, password, postId, postdate})
    .sort({"_id":-1});
    console.log("posting count : ", posts.length)

    console.log('get: /posts')
    res.json({ posts, 'msg': '/api/posts routes show'});

});

router.post('/posts', async (req, res) => {

    // 개별 키-값 데이터를 받아온다.
    const {name, title, content, password, postId, postdate} = req.body;

    console.log('var', postIdPlus)

    await Post.create({ name, title, content, password, postId, postdate});
    // 게시물 작성이니까 create
    const postIds = Number(postIdPlus + 1);
    console.log('postIds:', postIds)

    res.json({ result: "success"});
})

router.delete("/post/:postId", async (res, req) => {
    console.log("in delete");
    const { postId } = req.params;

    const {password} = req.body;
    const existPost = await Post.find({ postId: Number(postId)});

    const deletepw = await Post.find({postId: Number(postId)}, {_id: 0, password: 1})
    console.log('db pw:', deletepw[0].password)
    console.log('input pw:', password)

    if(deletepw[0].password.equal(password)){
        if (existPost.length) {
            await Post.deleteOne({ postId: Number(postId)});
            res.json({ msg: 'delete'})
        } else {
            res.json( { msg: '비밀번호가 틀렸습니다.'})
        }
    }
})

router.get("/posts/detail/:postId", async (req, res) => {
    const { postId } = req.params;
    console.log(postId);

    const num = await Post.find({ postId: Number(postId) });
    console.log(num);
    res.json({ num });
});


router.put("/posts/:postId", async (req, res) => {
    const {postId} = req.params;

    const {title, name, content, password} = req.body;
    console.log( title, name, content);

    const updatepw = await Post.find( {postId:Number(postId)}, {_id: 0, password:1} )
    console.log('db pw:',dbpw[0].password)
    console.log('input pw:',password)
    if(updatepw[0].password.equal(password)){
        if (existsPost.length) {
            await Post.updateOne({ postId: Number(postId) }, { $set: { title, name, content } });
            res.json({ msg: 'update'})
        }
    }else{
        res.json( {msg : '비밀번호 오류'} )
    }
})

// router.delete("/posts/:postNum", async (req, res) => {
//     const { postNum } = req.params;

//     const postdelete = await Post.findOneAndDelete({ postNum } ,
//         {title, content}); // postNum으로 검색해서 title content 변경

//     return res.redirect(`/posts/${postNum}`)
// })

module.exports = router;