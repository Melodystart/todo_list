const Todo = require('../todo')
const db = require('../../config/mongoose') //重構 Mongoose 連線設定

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }
  console.log('done')
})