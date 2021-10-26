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

    static async findByIdAndUpdate(id, data) {
        if(Object.keys(data).length === 0) throw new Error("Empty body");
        let sqlStatment = `UPDATE users SET `;
        for(const key in data) {
            sqlStatment += `${key} = '${data[key]}', `;
        }
        sqlStatment = sqlStatment.substring(0, sqlStatment.length - 2); // to remove the last comma and white space resulted from the loop
        sqlStatment += ` WHERE id = ${id}`;
        const queryResult = await dbConnectionPool.execute(sqlStatment);
        if (queryResult[0].affectedRows === 0)
            throw new Error("id does not exist");
        return await User.findById(id);
    }
}

module.exports = User;