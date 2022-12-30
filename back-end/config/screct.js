const fs = require('fs')
const path = require('path')
const private_key = fs.readFileSync(path.resolve(__dirname, 'keys/private.key'))
const public_key = fs.readFileSync(path.resolve(__dirname, 'keys/public.key'))
module.exports = {
    private_key, public_key
}