const dbConnectionPool = require("../config/db");
// to hash passwords before insertion and in case of changing them
const bcrypt = require("bcryptjs"); 
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
        // Hashing password
        const hashedPassword = await bcrypt.hash(this.password, 10); // (password, salt)
        this.password = hashedPassword;
        // Build SQL statement 
        let sqlStatement = `
            INSERT INTO users (firstname, lastname, email, password, phone, dob)
            VALUES (
                '${this.firstname}',
                '${this.lastname}',
                '${this.email}',
                '${hashedPassword}',
                '${this.phone}',
                '${this.dob}'
            )`;
        const queryResult = await dbConnectionPool.execute(sqlStatement);
        return User.findById(queryResult[0].insertId); 
    }

    static async findById (id) {
        let sqlStatement = `SELECT * FROM users WHERE id = ${id}`;
        const [user, _] = await dbConnectionPool.execute(sqlStatement);
        user[0].password = undefined;
        return user[0];
    }

    static async findByIdAndUpdate(id, data) {
        if(Object.keys(data).length === 0) throw new Error("Empty body");

        // build the query
        let sqlStatment = `UPDATE users SET `;
        for(const key in data) {
            sqlStatment += `${key} = '${data[key]}', `;
        }
        // to remove the last comma and white space resulted from the loop
        sqlStatment = sqlStatment.substring(0, sqlStatment.length - 2); 
        sqlStatment += ` WHERE id = ${id}`;

        // execute query
        const queryResult = await dbConnectionPool.execute(sqlStatment);

        if (queryResult[0].affectedRows === 0)
            throw new Error("id does not exist");
            
        // return user after editing
        return await User.findById(id);
    }

    async validatePassword(password) {
        // compare the provided password with the hashed password
        const isValidPassword = await bcrypt.compare(password, this.password);
        return isValidPassword? true : false;
    }
}

module.exports = User;