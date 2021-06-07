const router = require('express').Router()

const upload = require('../middleware/multer')
const product = require('../services/product')

router.post('/', upload.any(), product.upload)

module.exports = router
