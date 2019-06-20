const Sequelize = require('sequelize')

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
    define: {
      underscored: true
    }
  },
)

// Type Shortcuts

const id = {
  type: Sequelize.INTEGER,
  primaryKey: true,
  autoIncrement: true,
}

const required = type => typeof type == 'function'
  ? ({ type, allowNull: false })
  : ({ ...type, allowNull: false })

const unique   = type => typeof type == 'function'
  ? ({ type, unique: true, allowNull: false })
  : ({ ...type, unique: true, allowNull: false })

const WHOLENUM = () => ({ type: Sequelize.INTEGER, min: 0, defaultValue: 0 })
const NOSTAMPS = { timestamps: false }

;(async function init () {
  await db.sync()
  console.log('Database Successfully Connected')
})()

// Model Definitions

const Store = db.define('Store', {
  id,
  name: unique(Sequelize.STRING),
  has_customers: { type: Sequelize.BOOLEAN, defaultValue: false },
  customer_balance_warning: { ...WHOLENUM(), defaultValue: 2000 }
})

const Customer = db.define('Customer', {
  id,
  name    : unique(Sequelize.STRING),
  balance : required(WHOLENUM()),
  warn_at : WHOLENUM()
})

const CustomerTransaction = db.define('CustomerTransaction', {
  id,
  type        : Sequelize.ENUM('PURCHASE', 'CREDIT', 'PAYMENT', 'MIXED'),
  credit      : WHOLENUM(),
  debit       : WHOLENUM(),
  purchased   : Sequelize.TEXT('medium'),
  balance_at  : required(WHOLENUM()),
  comment     : Sequelize.STRING(140),
  created     : Sequelize.DATE
}, NOSTAMPS)

const Item = db.define('Item', {
  id,
  name     : unique(Sequelize.STRING),
  category : Sequelize.STRING,
  stock    : required(WHOLENUM()),
  price    : WHOLENUM(),
  low_at   : { ...WHOLENUM(), defaultValue: 0 }
})

const ItemTransaction = db.define('ItemTransaction', {
  id,
  added   : required(WHOLENUM()),
  removed : required(WHOLENUM()),
  comment : Sequelize.STRING(140),
  created : Sequelize.DATE
}, NOSTAMPS)

// Associations

Store.hasMany(Item, { as: 'Items' })
Store.hasMany(Customer, { as: 'Customers' })

Item.hasMany(ItemTransaction, { as: 'Transactions' })
Customer.hasMany(CustomerTransaction, { as: 'Transactions' })

// Exporting

module.exports = {
  Sequelize,
  db,

  Store,
  Customer,
  CustomerTransaction,
  Item,
  ItemTransaction,
}
