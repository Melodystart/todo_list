// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')// 引用 body-parser
const methodOverride = require('method-override')

const routes = require('./routes') // 引用路由器
require('./config/mongoose') //重構 Mongoose 連線設定

const app = express()
// 如果在 Heroku 環境則使用 process.env.PORT
// 否則為本地環境，使用 3000 
const PORT = process.env.PORT || 3000

// 設定 Handlebars
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
// extname:'.hbs'，是指定副檔名為.hbs，有了這行才能把預設長檔名改寫成短檔名
app.set('view engine', 'hbs')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
//讓每一筆路由都會透過 method-override 進行前置處理
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(routes)
// 設定應用程式監聽的埠號
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})