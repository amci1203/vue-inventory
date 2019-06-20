const { ItemTransaction } = require('@models')
const debug = require('debug')('Remove Item Transaction')

module.exports = async (req, res) => {
  const { id } = req.params

  try {
    await ItemTransaction.remove({
      where: { customer_id: id },
      order: { id: 'DESC' }
    })

    return res.json({ success: true })
  } catch (err) {
    debug(err)
    return res.json({ err: err.toString() })
  }
}