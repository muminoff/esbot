const db = require("./queries");


class AbstractUser {
    constructor (id, firstName, lastName=null, userName=null) {
        this.greetings = [
            "Ассалому алайкум",
            "Хайрли кун",
            "Салом",
            "Хуш кўрдик",
        ];
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
    }

    get fullName() {
        if(this.lastName !== null) {
            return `${this.firstName} ${this.lastName}`;
        } else return `${this.firstName}`;
    }

    makeGreeting() {
        let greeting = this.greetings[Math.floor(Math.random() * this.greetings.length)];
        return `${greeting}, ${this.fullName}.`;
    }

    save(commit=true) {
      if(commit) {
        db.insertAccount(this)
          .then(() => {
            console.log(`Saved ${this.id}.`);
          })
        .catch(e => {
          console.log('Error:', e);
        });
      }
      return this;
    }

}


class User extends AbstractUser {
    constructor(id, firstName, lastName=null, userName=null) {
        super(id, firstName, lastName, userName);
        this.isAdmin = false;
    }
}


class Admin extends AbstractUser {
    constructor(id, firstName, lastName=null, userName=null) {
        super(id, firstName, lastName, userName);
        this.isAdmin = true;
    }
}

module.exports = {
    User,
    Admin
};
