const mysql = require('mysql2')
const connectionPool = mysql.createPool({
  host: '47.113.231.177',
  port: 3306,
  database: 'myboke',
  user: 'myboke',
  password: 'TJy64rjd2ZdtErRn',
  connectionLimit: 5
})
// 获取连接是否成功
connectionPool.getConnection((err, connection) => {
  // 是否有错误信息
  if (err) {
    console.error(`数据库连接失败~ ${err}`)
    return
  }
  // 获取connection，尝试与数据库建立连接
  connection.connect(err => {
    if (err) {
      console.error(`数据库交互失败~ ${err}`)
    } else {
      connection.execute(
        `create table if not exists users(
                id INT PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(50),
                password VARCHAR(50) NOT NULL,
                username VARCHAR(50) NOT NULL UNIQUE,
                permission INT NOT NULL,
                 createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
               img_Url VARCHAR(50),
                updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );`,
        []
      )
      connection.execute(
        `create table if not exists columns(
            id INT PRIMARY KEY AUTO_INCREMENT,
            c_id INT,
            column_name VARCHAR(50) NOT NULL UNIQUE,
            createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY(c_id) REFERENCES users(id)
        );`,
        []
      )
      connection.execute(
        `create table if not exists articles(
            id INT PRIMARY KEY AUTO_INCREMENT,
            a_id INT,
            title VARCHAR(50) NOT NULL UNIQUE,
            content VARCHAR(65535),
            createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY(a_id) REFERENCES columns(c_id)
        );`,
        []
      )
      connection.execute(`select * from users where username = '游客模式';`, [], (err, value) => {
        if (!value.length) connection.execute(`insert into users (email, password, username, permission) values (?, ?, ?, ?);`, ['', 'youkemoshi', '游客模式', 0])
      })
      console.log(`数据库连接成功，可以操作数据库~`)
    }
  })
})
const connection = connectionPool.promise()
module.exports = connection
