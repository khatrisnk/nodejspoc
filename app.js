// const http = require('http')

// const routes = require('./routes')

// const server = http.createServer(routes)

// server.listen(3000)

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const expressHbs = require('express-handlebars')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const csurf = require('csurf')

const rootDir = require('./utils/path')
const database = require('./utils/database')

const Users = require('./models/users')

const errorController = require('./controllers/error')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')

const { MONGO_DB_LOCAL } = require('./constants')

const csrfMiddleware = require('./middlewares/csrf')

const app = express()

const store = new MongoDBStore({
    uri: MONGO_DB_LOCAL,
    collection: 'session'
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'My Secret',
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(csurf())

// app.engine('hbs', expressHbs({
//     layoutsDir: 'views/layouts',
//     defaultLayout: 'main-layout',
//     extname: 'hbs'
// }))
// app.set('view engine', 'hbs')

// app.set('view engine', 'pug')
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use((req, res, next) => {
    console.log('This custom middleware call every time')
    if (!req.session.user) {
        return next()
    }
    Users.findById(req.session.user._id)
        .then(user => {
            req.user = user
            next()
        })
        .catch((err) => {
            console.log(err)
        })
})
app.use(csrfMiddleware)

app.use(authRoutes.router)
app.use('/admin', adminRoutes.router)
app.use(shopRoutes.router)

app.use(errorController.get40ErrorPage)
database.mongoConnect(() => {
    console.log('localhost listening on port 3000!!!')
    app.listen(3000)
})
