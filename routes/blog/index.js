import express from 'express'

import create from './create.js'
import update from './update.js'
import view from './view.js'
import del from './delete.js'

const rt = express.Router()

rt.use('/new', create)
rt.use('/update', update)
rt.use('/view', view)
rt.use('/delete', del)

export default rt