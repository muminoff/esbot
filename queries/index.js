"use strict";

const promise = require("bluebird");

const options = {
    promiseLib: promise
};

const pgp = require("pg-promise")(options);
const conn = "postgres://localhost:5433/bozor";
const db = pgp(conn);


function insertAccount(user) {
    const query = `
    insert into users (id, first_name, last_name, username, is_admin)
    values ($1, $2, $3, $4, $5)
    on conflict (id)
    do update set (first_name, last_name, username, is_admin) = ($2, $3, $4, $5)
    returning id
  `;
    return db.one(query, [user.id, user.firstName, user.lastName, user.userName, user.isAdmin])
  .finally(() => {
      pgp.end();
  });
}


function accountExists(user) {
    const query = `
    select exists (select id from users where id = $1)
  `;
    return db.one(query, [user.id])
  .finally(() => {
      pgp.end();
  });
}


function accountJoinedTime(user) {
    const query = `
    select joined from users where id =  $1
  `;
    return db.one(query, [user.id])
  .finally(() => {
      pgp.end();
  });
}


module.exports = {
    insertAccount: insertAccount,
    accountExists: accountExists,
    accountJoinedTime: accountJoinedTime
};
