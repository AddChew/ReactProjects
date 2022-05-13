import path from 'path'
import fs from 'fs'
import express from 'express'
import React from 'react'
import { StaticRouter } from 'react-router-dom/server'
import ReactDOMServer from 'react-dom/server'
import Helmet from 'react-helmet'
import App from '../src/containers/App'

const PORT = 8080
const app = express()

app.use(express.static(path.join(__dirname, '..', 'build')))

app.get('/*', (request, response) => {
    const app = ReactDOMServer.renderToString(
    <StaticRouter location={ request.url }>
        <App />
    </StaticRouter>
    )
    const helmet = Helmet.renderStatic()

    const indexfile = path.resolve('./build/index.html')
    fs.readFile(indexfile, 'utf-8', (error, data) => {
        if (error) {
            console.error('Something went wrong:', error)
            return response.status(500).send('Oops, better luck next time!')
        }
        data = data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        data = data.replace('<meta name="helmet" />', `${helmet.title.toString()}${helmet.meta.toString()}`)
        return response.send(data)
    })
})

app.listen(PORT, () => {
    console.log(`Server-Side Rendered application runnng on port ${PORT}`)
})