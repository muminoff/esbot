const User = require("./users.js").User;
const Admin = require("./users.js").Admin;
const db = require("./queries");

let sardor = new User(562352365, "Sardor");
let marhabo = new Admin(562352378, "Marhabo", "Muminova", "muminova");

sardor.save();
console.log(sardor.makeGreeting());

marhabo.save();
console.log(marhabo.makeGreeting());
