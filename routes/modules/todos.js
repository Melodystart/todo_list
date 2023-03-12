// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')


// 設定new頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

// 設定detail頁面路由
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo: todo }))
    .catch(error => console.log(error))
})
// 設定edit頁面路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo: todo }))
    .catch(error => console.log(error))
})

//設定路由來接住表單新增資料，並且把資料送往資料庫
router.post('/', (req, res) => {
  const todos = String(req.body.name).split(',').map(todo => ({ name: todo })); // 從 req.body 拿出表單裡的 name 資料並以","分割資料
  //[123,456]
  //[{name:123},{name:456}]
  Todo.insertMany(todos)
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//設定路由來接住表單修改資料，並且把資料送往資料庫
router.put('/:id', (req, res) => {
  const id = req.params.id //id 要從網址上用 req.params.id 拿下來，
  const { name, isDone } = req.body //從填寫表單資料取出name, isDone
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === "on"
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

//設定路由來刪除資料
router.delete('/:id', (req, res) => {
  const id = req.params.id //透過 req.params.id 取得網址上的識別碼，用來查詢使用者想刪除的 To-do
  return Todo.findById(id) //使用 Todo.findById 查詢資料，資料庫查詢成功以後，會把資料放進 todo
    .then(todo => todo.remove())
    .then(() => res.redirect('/')) //成功刪除以後，使用 redirect 重新呼叫首頁，此時會重新發送請求給 GET /，進入到另一條路由。
    .catch(error => console.log(error))
})



// 匯出路由模組
module.exports = router