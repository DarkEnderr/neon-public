const mongoose = require('mongoose');
const User = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    userid: { type: String, unique: true, required: true },
    cash: { type: Number, default: 0 },
    health: { type: Number, default: 100 },
    maxhealth: { type: Number, default: 100 },
    weapon: { type: String, default: "<:a_:1052463689212641300> " },
    helmet: { type: String, default: "<:unnamed18:1052541132623593524> " },
    chestplate: { type: String, default: "" },
    legging: { type: String, default: "<:unnamed20:1052541123001851936> " },
    boot: { type: String, default: "" },
    sharp: { type: Number, default: 10 },
    protection: { type: Number, default: 3 },
    cooldowns: {
        daily: { type: Date },
        prize: { type: Date },
        beg: { type: Date },
        setHealth: { type: Date }
    },
    level: { type: Number, default: 1 },
    exp: { type: Number, default: 0 },
    timejoin: { type: Date },
    card: { 
        attack: { type: String },
        magic: { type: String },
        health: { type: String },
        protect: { type: String }
    },
    inventory: { type: Array }
});


const Bots = new mongoose.Schema({
    join: { type: Number, default: 0 },
    leave: { type: Number, default: 0 },
    useCommand: { type: Number, default: 0 }
})

const Users = mongoose.model('User', User);
const Guilds = mongoose.model('Guild', Bots)

module.exports = {
    Users,
    Guilds
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