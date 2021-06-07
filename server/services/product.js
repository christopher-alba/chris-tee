const axios = require('axios')

exports.upload = async (req, res) => {
  const { files, body } = req

  console.log(files)
  console.log(body)

  try {
    res.status(201).json('file uploaded')
  } catch (error) {
    res.status(204).json('something went wrong')
  }
}
