const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded());

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/blogDB');

const { Schema } = mongoose;

const postsSchema = new Schema({ title: String, post: String });
const Posts = mongoose.model('Post', postsSchema);



app.listen(port, () => console.log(`Example app listening on port port!`));

//Home Route

app.get('/', function (req, res) {

    let readPostList = [];

    readPostList = Posts.find({}, function (error, data) {
        //console.log(data);
        readPostList = data;
        res.render('home', { postList: readPostList });
    });

});

//Compose Route

app.get('/compose', function (req, res) {
    res.render('compose', {});
});

app.post('/compose', function (req, res) {
    const title = req.body.compose_title;
    const post = req.body.compose_post;

    const postDoc = new Posts({ title: title, post: post });

    postDoc.save();

    res.redirect('/');

});

//About Route

app.get('/about', function (req, res) {
    res.render('about', {});
});


//Contact Route

app.get('/contact', function (req, res) {
    res.render('contact', {});
});

