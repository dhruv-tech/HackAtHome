
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
    },
    pushto: {
        type: String
    }
});

const CommunitySchema = new Schema({
    name: {
        type: String,
        required: [true, "Name Needed"]
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
    category: {
        type: String
    },
    phone: {
        type: String
    },
    description: {
        type: String
    },
    name: {
        type:String
    },
    done: {
        type: Boolean
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
    tasks: {
        type: Object
    }
});

const EventSchema = new Schema({
    user: {
        type: String,
        required: [true, "User Needed"]
    },
    stream: {
        type: String
    },
    description: {
        type: String
    },
    isLive: {
        type: Boolean
    }
});

const TokenSchema = new Schema({
    user: {
        type: String,
        required: [true, "User Needed"]
    },
    community: {
        type: String,
        required: [true, "Community Needed"]
    }
});

const Model = {};

Model.User = mongoose.model('user', UserSchema);
Model.Event = mongoose.model('event', EventSchema);
Model.Community = mongoose.model('community', CommunitySchema);
Model.Requester = mongoose.model('essential_request', RequesterSchema);
Model.Collector = mongoose.model('essential_collector', CollectorSchema);
Model.Token = mongoose.model('session', TokenSchema);

module.exports = Model;