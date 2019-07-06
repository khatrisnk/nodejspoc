const get40ErrorPage = (req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
    res.status(404).render('404', { pageTitle: '404', path: '/error' })
}

module.exports = {
    get40ErrorPage
}
