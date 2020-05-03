
const mongoose = require('mongoose');
const Models = require('../.config/db_schemas');
const bcrypt = require('bcrypt');

const auth = {};

auth.check = (token, c) => {
    return new Promise((resolve, reject) => {
        Models.Token.findOne({_id: token, community: c}).then((res) => {
            if (res != null) {
                resolve();
            } else {
                reject();
            }

        });
    });
    
}

auth.cname = (cid) => {
    return new Promise(resolve => {
        Models.Community.findOne({_id: cid}).then(async(res) => {
            resolve(res.name);
        });
    })
    
};

auth.session = (user, pass) => {
    return new Promise(async(resolve, reject) => {
        Models.User.findOne({email: user}).then(async(res) => {
            console.log({email: user});
            console.log(res);
            if (res == null) {
                let uid = await auth.registerUser('idk', user, 'start', 'idk', false, pass);
                Models.Token.create({user: uid, community: 'start'}).then((token) =>{
                    resolve({sid: token._id, cid: token.community});
                });
            } else {
                console.log(res);
                bcrypt.compare(pass, res.password, function(err, result) {
                    if(result == true) {
                        Models.Token.create({user: res._id, community: res.community}).then((token) =>{
                            resolve({sid: token._id, cid: token.community});
                        });
                    } else {
                        reject({reg: true, pass: false});
                    }
                });
            }

        });
    });
}

auth.join = (token, cid, hno, nme) => {
    return new Promise(async(resolve, reject) => {
        Models.Community.findOne({_id: cid}).then(async(res) => {
            if (res == null) {
                reject();
            } else {
                Models.Token.findOneAndUpdate({_id: token}, {community: cid}).then((token) =>{
                    Models.User.findOneAndUpdate({_id: token.user}, {community: cid, houseNo: hno, name: nme}).then((user) =>{
                        resolve({sid: token._id, cid: token.community});
                    });
                });
            }

        });
    });
}

auth.new = (token, cname, cadd, hno, nme) => {
    return new Promise(async(resolve, reject) => {
        Models.Community.create({name: cname, address: cadd}).then(async(res) => {
            if (res == null) {
                reject();
            } else {
                Models.Token.findOneAndUpdate({_id: token}, {community: res._id}).then((token) =>{
                    Models.User.findOneAndUpdate({_id: token.user}, {community: res._id, houseNo: hno, name: nme, isAdmin: true}).then((user) =>{
                        resolve({sid: token._id, cid: res._id});
                    });
                });
            }

        });
    });
}

auth.registerUser = (u_name, u_email, u_community, u_houseno, u_isAdmin, u_pass) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(u_pass, 10, (err, hash) => {
            if(err) {
                reject();
            } else {
                Models.User.create(
                    {
                        name: u_name,
                        email: u_email,
                        community: u_community,
                        houseNo: u_houseno,
                        isAdmin: u_isAdmin,
                        password: hash
                    }
                ).then(data => {
                    resolve(data._id);
                }).catch(err => {
                    reject();
                })

            }
        });
    });
    
}

auth.registerCommunity = (c_name, c_admin, c_contact, c_country, c_address) => {
    return new Promise((resolve, reject) => {
        Models.User.create(
            {
                name: c_name,
                admin: c_admin,
                contact: c_contact,
                country: c_country,
                address: c_address
            }
        ).then(data => {
            resolve();
        }).catch(err => {
            reject();
        })

    });
    
}


module.exports = auth;