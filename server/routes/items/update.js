const { Item } = require('@models')
const debug = require('debug')('Update Item')

module.exports = async (req, res) => {
  const { id } = req.params

  try {
    const item = await Item.update(req.body, {
      where: { id },
      returning: true
    })
    return res.json(item[1])
  } catch (err) {
    debug(err)
    res.status(500).send(err.toString())
  }
}