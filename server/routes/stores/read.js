const { Store } = require('@models')

module.exports = async (req, res) => {
  const { id } = req.params

  try {
    if (id) {
      const store = await Store.findOne({ where: { id } })
      const items = await store.getItems()
      
      const json = { store, items }
      if (store.has_customers) json.customers = await store.getCustomers()

      req.app.locals.store = store.id
      return res.json(json)
    } else {
      const stores = await Store.findAll()
      return res.json(stores)
    }
  } catch (err) {
    console.error(err)
    res.status(500).send(err.toString())
  }
}