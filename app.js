// const http = require('http')

// const routes = require('./routes')

// const server = http.createServer(routes)

// server.listen(3000)

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const rootDir = require('./utils/path')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'pug')
app.set('views', 'views')

app.use((req, res, next) => {
    // console.log('This custom middleware call every time')
    next()
})
app.use('/admin', adminRoutes.router)
app.use(shopRoutes)

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
    res.status(404).render('404', { pageTitle: '404' })
})

app.listen(3000)