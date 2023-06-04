// database.js

let registeredUsers = [];

function addUser(username, email, password) {
  registeredUsers.push({ username, email, password });
}

function getUserByUsername(username) {
  return registeredUsers.find(user => user.username === username);
}

module.exports = {
  addUser,
  getUserByUsername,
};
