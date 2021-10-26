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
        if(user[0])
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

        const queryResult = await dbConnectionPool.execute(sqlStatment);

        if (queryResult[0].affectedRows === 0)
            throw new Error("id does not exist");
            
        // return user after editing
        return await User.findById(id);
    }

    validatePassword (password) {
        // compare the provided password with the hashed password
        return bcrypt.compare(password, this.password);
    }

    static async findByEmail (email) {
        // returns the first match
        const sqlStatement = `SELECT * FROM users WHERE email = '${email}'`;
        const [user, _] = await dbConnectionPool.execute(sqlStatement);
        if (user[0])
            return new User(
                user[0].firstname,
                user[0].lastname,
                user[0].email,
                user[0].password,
                user[0].phone,
                user[0].dob);
        return null;
    }
}

module.exports = User;