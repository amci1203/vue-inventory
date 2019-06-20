const { CustomerTransaction } = require('@models')
const debug = require('debug')('Remove Customer Transaction')

module.exports = async (req, res) => {
  const { id } = req.params

  try {
    await Customer.remove({
      where: { customer_id: id },
      order: { id: 'DESC' }
    })

    return res.json({ success: true })
  } catch (err) {
    debug(err)
    return res.status(500).json({ err: err.toString() })
  }
}