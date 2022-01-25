import express from 'express'

let app = express()

import init from './init.js'
import routes from './routes/index.js'


init(app)



app.use('/api', routes)

app.listen(process.env.PORT || 5000, () => 'Server is running...')