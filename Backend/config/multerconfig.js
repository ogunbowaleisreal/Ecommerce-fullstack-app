const multer = require('multer')

const upload = multer({
    dest: './uploads',
    limits:{fileSize: 7*1024*1024 }
})

module.exports = upload