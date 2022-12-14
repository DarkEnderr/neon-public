const mongoose = require('mongoose');
const User = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    userid: { type: String, unique: true, required: true },
    cash: { type: Number, default: 0 },
    weapon: { type: String, default: "https://cdn.discordapp.com/emojis/1052463689212641300.webp?size=44&quality=lossless" },
    helmet: { type: String, default: "" },
    chestplate: { type: String, default: "" },
    legging: { type: String, default: "" },
    boot: { type: String, default: "" },
    cooldowns: {
        daily: { type: Date },
        prize: { type: Date },
        beg: { type: Date },
        boss: { type: Date }
    },
    level: { type: Number, default: 1 },
    timejoin: { type: Date },
    card: { 
        attack: { type: String },
        magic: { type: String },
        health: { type: String },
        protect: { type: String }
    },
    inventory: { type: Array }
});


const Guild = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    join: { type: Number, default: 0 },
    leave: { type: Number, default: 0 },
    useCommand: { type: Number, default: 0 }
})

const Users = mongoose.model('User', User);
const Guilds = mongoose.model('Guild', Guild)

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