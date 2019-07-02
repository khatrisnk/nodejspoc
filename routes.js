const requestHandeler = (req, res) => {
    const url = req.url;
    if(url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html><head><title>Home</title></head><body><form action="/create-user" method="POST"><input name="username"/><button>Submit</button></form></body></html>')
        res.end()
    }
    if(url === '/users') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html><head><title>Users</title></head><body><ul><li>user 1</li><li>user 2</li></ul></body></html>')
        res.end()
    }
    if(url === '/create-user') {
        const body = []
        req.on('data', chunk => {
            body.push(chunk)
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const username = parsedBody.split('=')[1]
            console.log(username)
        })
        res.statusCode = 302
        res.setHeader('Content-Type', 'text/html')
        res.setHeader('Location', '/')
        res.end()
    }
}

module.exports = requestHandeler