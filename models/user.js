const dbConnectionPool = require("../config/db");
class User {
    constructor(firstname, lastname, email, password, phone, dob) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.dob = dob;
    }

    save() {
        let sqlStatement = `
            INSERT INTO users (firstname, lastname, email, password, phone, dob)
            VALUES (
                '${this.firstname}',
                '${this.lastname}',
                '${this.email}',
                '${this.password}',
                '${this.phone}',
                '${this.dob}',
            )`;
        const [newUser, _] = dbConnectionPool.execute(sqlStatement);
        return newUser;
    }
}

module.exports = User;