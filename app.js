// const http = require('http')

// const routes = require('./routes')

// const server = http.createServer(routes)

// server.listen(3000)

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const rootDir = require('./utils/path')
const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    console.log('This custom middleware call every time')
    next()
})
app.use('/admin', adminRouter)
app.use(shopRouter)

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})

app.listen(3000)