// HackAtHome Backend | Dhruv
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const auth = require('./services/auth');
const essential = require('./services/essentials');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://neko:itsneko123!@nekosmemory-yutkk.mongodb.net/memory?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(
    () => {
        console.log("Connected to Neko's Memory!");
    },
    err => {
        console.log("Neko could not connect to memory: "+ err);
    }
);

app.use('/static', express.static('views/static'));

app.use('/c/:data', async(req, res, next) => {
    try {
        await auth.check(req.cookies.token, req.params.data);
        next();
    } catch(e) {
        res.sendStatus(401);
    }
});

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/c/start', (req, res) => {
    res.render('start');
    
});

app.get('/c/start/join', (req, res) => {
    res.render('start-join');
    
});

app.get('/c/start/new', (req, res) => {
    res.render('start-new');
    
});

app.get('/c/:cid', async(req, res) => {
    let cname = await auth.cname(req.params.cid);
    res.render('dash', {cid: req.params.cid, cname: cname});
    
});

app.get('/c/:cid/essentials', (req, res) => {
    if (req.params.cid != 'start') {
        res.render('essentials');
    } else {
        res.sendStatus(401);
    }
    
});
app.get('/c/:cid/getter', async(req, res) => {
    if (req.params.cid != 'start') {
        let data = await essential.read();
        console.log(data);
        res.render('getter', {arr: data});
    } else {
        res.sendStatus(401);
    }
    
});

app.post('/api/login', async(req, res) => {
    try{
        let session = await auth.session(req.body.user, req.body.password);
        res.cookie('token', session.sid);
        res.send({msg: false, target: `/c/${session.cid}`});
    } catch (e) {
        console.log(e);
        if (e.pass == false) {
            res.send({msg: "Incorrect Password!"});
        } else {
            res.send({msg: "Insuffient Data"});
        }
    }
});

app.post('/api/join', async(req, res) => {
    try{
        let session = await auth.join(req.cookies.token, req.body.cid, req.body.hno, req.body.name);
        res.send({msg: false, target: `/c/${session.cid}`});
    } catch (e) {
        res.send({msg: "Error!"});
    }
});

app.post('/api/new', async(req, res) => {
    console.log("check");
    try{
        console.log("!");
        let session = await auth.new(req.cookies.token, req.body.cname, req.body.cadd, req.body.hno, req.body.name);
        console.log("!!");
        res.send({msg: false, target: `/c/${session.cid}`});
    } catch (e) {
        res.send({msg: "Error!"});
    }
});

app.post('/api/req', async(req, res) => {
    try{
        await essential.add(req.cookies.token, req.body.cat, req.body.pho, req.body.des);
        res.send({msg: "Request Saved."});
    } catch (e) {
        res.send({msg: "Error!"});
    }
});

app.post('/api/buy', async(req, res) => {
    try{
        await essential.done(req.body.uuid);
        res.send({msg: "Thanks you for helping!"});
    } catch (e) {
        res.send({msg: "Error!"});
    }
});

app.listen(3000);