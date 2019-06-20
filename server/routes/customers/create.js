const create = require('@modules/create-customer')

module.exports = async (req, res) => {
  const body = req.body.customers
  const customers = []

  for (let i = body.length; i--;) {
    const { name } = body.customers[i]
    const customer = await create(name)
    customers.push(customer)
  }

  res.json(customers.length === 1 ? customers[0] : customers)
}