const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded());

app.set('view engine', 'ejs');

//global variable
let postList = [];


app.listen(port, () => console.log(`Example app listening on port port!`));

//Home Route

app.get('/', function (req, res) {
    res.render('home', { postList: postList });
});

//Compose Route

app.get('/compose', function (req, res) {
    res.render('compose', {});
});

app.post('/compose', function (req, res) {
    const title = req.body.compose_title;
    const post = req.body.compose_post;

    postList.push({ title: title, post: post });

    //console.log(postList);

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

