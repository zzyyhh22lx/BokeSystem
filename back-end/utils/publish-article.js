const { getNowDate } = require('./get-now-time')

const columnMap = new Map()

// interface dataType {
//     a_id:number, // 属于哪个专栏
//     username:string,
//     title:string, // a_id确定则仅有唯一值
//     content:string,
//     status: '待审批'|'已驳回'|'已发布'
// }

const setArticle = (a_id, username, title, content) => {
    a_id = parseInt(a_id)
    const data = {
        a_id, username, title, content, status: '待审批', createAt: getNowDate()
    }
    let value = []
    if(columnMap.has(a_id)) value = columnMap.get(a_id)
    for(let i = 0; i < value.length; i++) {
        if(value[i].title === title) return false
    }
    value.push(data)
    columnMap.set(a_id, value)
    console.log(typeof a_id)
    return true
}

const setStatus = (a_id, title, opinion) => {
    a_id = parseInt(a_id)
    const op = opinion === 'yes' ? '已发布' : '已驳回'
    if(!columnMap.has(a_id)) return false
    let value = columnMap.get(a_id)
    value.forEach((value) => {
        if(value.title === title) value.status = op
    })
    columnMap.set(a_id, value)
    return true
}

const getMyArticles = (username) => { // 获取与用户相关的文章
    const articles = []
    columnMap.forEach(value => {
        value.forEach(item => {
            if(item.username === username) articles.push(item)
        })
    })
    return articles
}

const getColumn = (a_id) => { // 获取指定专栏的所有文章
    a_id = parseInt(a_id)
    if(columnMap.has(a_id)) {
        return columnMap.get(a_id)
    }
    return []
} 

const getArticle = (a_id, title) => { // 获取指定专栏的指定名字的文章
    a_id = parseInt(a_id)
    let article
    getColumn(a_id).forEach(item => {
        if(item.title === title) article = item
    })
    return article
}

const getAllArticles = () => { // 方便审核操作(不会出现删除的文章)
    const articles = []
    columnMap.forEach(value => {
        value.forEach(item => {
            articles.push(item)
        })
    })
    return articles
}

const deleteArticle = (a_id, title) => {
    a_id = parseInt(a_id)
    let i = undefined, value = getColumn(a_id)
    value.forEach((value, index) => {
        if(value.a_id === a_id && value.title === title) i = index
    })
    if(i !== undefined) {
        value.splice(i, 1)
        columnMap.set(a_id, value)
        return true
    }
    return false
}

module.exports = {
    setArticle, getColumn, getAllArticles, setStatus, deleteArticle, getMyArticles, getArticle
}