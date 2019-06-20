const { sequelize, CustomerTransaction } = require('@models')
const debug = require('debug')('Create Customer Transaction')

module.exports = async (req, res) => {
  const { id } = req.params
  const { transaction, purchases, name } = req.body

  try {
    const created = new Date()
    await sequelize.transaction(async t => {
      const db = { transaction: t }
      const items = []

      const customer = await CustomerTransaction.create({
        ...transaction,
        customer_id: id,
        created
      }, db)

      for (let i = purchases.length; i--;) {
        const transaction = await ItemTransaction.create({
          ...purchases[i],
          created,
          comment: `Purchased by ${name}`,
        }, db)

        items.push(transaction.id)
      }

      return res.json({
        items,
        customer: customer.id
      })
    })
  } catch (err) {
    debug(err)
    return res.status(500).json({ err: err.toString() })
  }
}