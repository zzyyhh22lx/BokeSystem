const connection = require('../database')
const { uniqueName } = require('../utils/get-unique-name')

class UserService {
    async create(user) {
        const { email, password } = user
        const username = uniqueName()
        const statement = `insert into users (email, password, username, permission) values (?, ?, ?, ?);`
        const [result] = await connection.execute(statement, [email, password, username, 1])
        return result
    }
    async findByEmail(email) {
        const statement = `select * from users where email = ?;`
        const [values] = await connection.execute(statement, [email])
        return values
    }
    async getAllUsers() {
        const statement = `select * from users`
        const [values] = await connection.execute(statement, [])
        return values
    }
}

module.exports = new UserService()