
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name Needed"]
    },
    email: {
        type: String,
        required: [true, "Email Needed"]
    },
    community: {
        type: String,
        required: [true, "Community Needed"]
    },
    houseNo: {
        type: String,
        required: [true, "House Nuumber Needed"]
    },
    isAdmin: {
        type: Boolean,
        required: [true, "Is Admin?"]
    },
    password: {
        type: String,
        required: [true, "Password Needed"]
    }
});

const CommunitySchema = new Schema({
    name: {
        type: String,
        required: [true, "Name Needed"]
    },
    admin: {
        type: String,
        required: [true, "Admin Needed"]
    },
    contact: {
        type: String,
        required: [true, "Contacts Needed"]
    },
    country: {
        type: String,
        required: [true, "Country Needed"]
    },
    address: {
        type: String,
        required: [true, "Address Needed"]
    }
});

const RequesterSchema = new Schema({
    user: {
        type: String,
        required: [true, "user Needed"]
    },
    comments: {
        type: String
    },
    items: {
        type: Array
    }
});

const CollectorSchema = new Schema({
    user: {
        type: String,
        required: [true, "User Needed"]
    },
    comments: {
        type: String
    },
    items: {
        type: Array
    }
});