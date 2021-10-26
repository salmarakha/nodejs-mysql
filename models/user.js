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

    async save() {
        let sqlStatement = `
            INSERT INTO users (firstname, lastname, email, password, phone, dob)
            VALUES (
                '${this.firstname}',
                '${this.lastname}',
                '${this.email}',
                '${this.password}',
                '${this.phone}',
                '${this.dob}'
            )`;
        const queryResult = await dbConnectionPool.execute(sqlStatement);
        return User.findById(queryResult[0].insertId); 
    }

    static async findById (id) {
        let sqlStatement = `SELECT * FROM users WHERE id = ${id}`;
        const [user, _] = await dbConnectionPool.execute(sqlStatement);
        return user;
    }
}

module.exports = User;