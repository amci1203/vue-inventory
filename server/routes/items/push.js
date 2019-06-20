const { ItemTransaction } = require('@models')
const debug = require('debug')('Create Item Transaction')

module.exports = async (req, res) => {
  const { id } = req.params
  const { transaction } = req.body

  try {
    const saved = await ItemTransaction.create({
      ...transaction,
      item_id: id
    })

    return res.json(saved)
  } catch (err) {
    debug(err)
    return res.json({ err: err.toString() })
  }
}