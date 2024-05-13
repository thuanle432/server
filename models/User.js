class User {
    constructor(username, password, id_role = 3) {
      this.username = username;
      this.password = password;
      this.id_role = id_role;
    }
}

module.exports = User;