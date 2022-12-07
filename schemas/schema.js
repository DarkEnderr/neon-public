const mongoose = require('mongoose');
const User = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    userid: String,
    cash: { type: Number, default: 0 },
    musketeer: { type: Number, default: 0 },
    archer: { type: Number, default: 0 },
    horse: { type: Number, default: 1 },
    cannon: { type: Number, default: 0 },
    house: { type: Number, default: 1 },
    cooldowns: {
        daily: { type: Date },
        prize: { type: Date }
    }
});

const Users = mongoose.model('User', User);

module.exports = {
    Users
}





/*const mongoose = require("mongoose")

const User = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    wallet: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    employee: { type: Number, default: 0 },
    employeelv: { type: Number, default: 1 },
    cooldowns: {
        work: { type: Date },
        beg: { type: Date },
        daily: { type: Date }
    }
})

module.exports = { User: mongoose.model("User", User) }*/