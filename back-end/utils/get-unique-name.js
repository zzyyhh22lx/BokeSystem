function getUniqueName() { // 闭包存储
    var id = 0;
    return () => {
        return `User${id++}`
    }
}
const uniqueName = getUniqueName()
module.exports = {
    uniqueName
}