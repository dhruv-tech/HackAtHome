
const mongoose = require('mongoose');
const Models = require('../.config/db_schemas');
const bcrypt = require('bcrypt');

const auth = {};

auth.check = (token, c) => {
    return new Promise((resolve, reject) => {
        Models.Token.find({_id: token, community: c}).then((res) => {

            if (res != {}) {
                resolve();
            } else {
                reject();
            }

        });
    });
    
}

auth.session = (user, pass) => {
    return new Promise((resolve, reject) => {
        Models.Token.findOne({user: user}).then((res) => {
            console.log(res);
            if (res == null) {
                reject({reg: false, pass: false});
            } else {
                bcrypt.compare(pass, res.password, function(err, result) {
                    if(result == true) {
                        resolve();
                    } else {
                        reject({reg: true, pass: false});
                    }
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
                    resolve();
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