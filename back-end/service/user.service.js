const connection = require('../database')
const { uniqueName } = require('../utils/get-unique-name')

class UserService {
    async create(user) { // 创建用户
        const { email, password } = user
        const username = uniqueName()
        const statement = `insert into users (email, password, username, permission) values (?, ?, ?, ?);`
        const [result] = await connection.execute(statement, [email, password, username, 1])
        return result
    }
    async findByEmail(email) { // 查找email是否存在
        const statement = `select * from users where email = ?;`
        const [values] = await connection.execute(statement, [email])
        return values
    }
    async getAllUsers() { // 获取所有用户
        const statement = `select * from users`
        const [values] = await connection.execute(statement, [])
        return values
    }
    async findByColumnName(column_name, id) { // 查询专栏名是否唯一(c_id已知) | 获取专栏id
        const statement = `select * from columns where column_name = ? and c_id = ?`
        const [values] = await connection.execute(statement, [column_name, id])
        return values
    }
    async findAllColumn(c_id) {
        const statement = `select * from columns where c_id = ?`
        const [values] = await connection.execute(statement, [c_id])
        return values
    }
    async finAllArticles(id) { // 获取用户所有文章(右联结)
        const statement = `select users.username, columns.c_id, columns.column_name, articles.title, articles.content, articles.status, articles.createAt articles.id from users right join columns on users.id = columns.c_id and users.id = ? right join articles on columns.id = articles.a_id`
        const [values] = await connection.execute(statement, [id])
        return values
    }
    async finColumnArticles(a_id) { // 获取目标专栏所有文章
        const statement = `select * from articles where a_id = ?`
        const [values] = await connection.execute(statement, [a_id])
        return values
    }
    async deleteColumn(column_name) {
        const statement = `delete from columns where column_name = ?`
        const [values] = await connection.execute(statement, [column_name])
        return values
    }
    async finByArticle(title, a_id) { // 查询文章是否唯一
        const statement = `select * from articles where title = ? and a_id = ?`
        const [values] = await connection.execute(statement, [title, a_id])
        return values
    }
    async writeColumn(c_id, column_name) { // 专栏命名
        const statement = `insert into columns (c_id, column_name) values (?, ?);`
        const [result] = await connection.execute(statement, [c_id, column_name])
        return result
    }
    async publishArticle(a_id, title, content, opinion) {
        if(opinion === 'no') return [{ msg: '已驳回' }]
        const statement = `insert into articles (a_id, title, content, status) values (?, ?, ?, ?);`
        const [result] = await connection.execute(statement, [a_id, title, content, '已发布'])
        return result
    }
}

module.exports = new UserService()