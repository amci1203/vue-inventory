const { Store } = require('@models')

module.exports = async (req, res) => {
  const { name } = req.body

  try {
    const newStore = await Store.create(req.body)
    req.app.locals.store = newStore.id
    return res.json(newStore)
  } catch (err) {
    console.error(err)
    res.status(500).send(err.toString())
  }
}