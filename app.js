// HackAtHome Backend | Dhruv
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const auth = require('./services/auth');

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

// app.use('/c/:data', async(req, res, next) => {
//     try {
//         await auth.check(req.cookies.token, req.params.data);
//         next();
//     } catch(e) {
//         res.send(401);
//     }
// });

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/api/login', async(req, res) => {
    try{
        console.log(req.body);
        await auth.session(req.body.user, req.body.password);
        res.send({msg: false, target: "/go"});
    } catch (e) {
        console.log(e);
        if(e.reg == false) {
            res.send({msg: false, target: "/reg"});
        } else if (e.pass == false) {
            res.send({msg: "Incorrect Password!"});
        } else {
            res.send({msg: "Insuffient Data"});
        }
    }
});

app.listen(3000);