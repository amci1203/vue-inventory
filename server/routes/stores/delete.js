const { Store } = require('@models')
const debug = require('debug')('Delete Store')

module.exports = async (req, res) => {
  const { id } = req.params

  try {
    await Store.destroy({ where: {id} })
    res.json({ success: true })
  } catch (err) {
    debug(err)
    res.status(500).json({ err: err.toString() })
  }
}