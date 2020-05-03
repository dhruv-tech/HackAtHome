
const mongoose = require('mongoose');
const Models = require('../.config/db_schemas');

let essentials = {};

essentials.add = (token, cat, pho, des) => {
    return new Promise(resolve => {
        Models.Token.findOne({_id: token}).then(async(t) => {
            Models.User.findOne({_id: t.user}).then(async(u) => {
                Models.Requester.create({user: t.user, name: u.name + " - " + u.houseNo, phone: pho, category: cat, description: des, done: false}).then(async(res) => {
                    resolve(res);
                });
            });
        });
    })
    
};

essentials.read = () => {
    return new Promise(resolve => {
        Models.Requester.find({done: false}).then(async(res) => {
            resolve(res);
        });
    });
}

essentials.done = (id) => {
    return new Promise(resolve => {
        Models.Requester.findOneAndUpdate({_id: id}, {done:true}).then(async(res) => {
            resolve(res);
        });
    });
}

module.exports = essentials;