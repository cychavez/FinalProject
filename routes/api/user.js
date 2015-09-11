// Debugging
import bug from 'debug'
const debug = bug('express-server:api:user')

// Database
import db from '../../lib/db'

// Router
import express from 'express'
const router = express.Router()

import snakeProps from '../../lib/snake-props'

// List all users
router.get('/', (req, res) => {
  debug(`GET ${req.path}`)

  db.selectFile('all-users', (error, rows, fields) => {
    if (error) {
      debug('DB Error', error)
      return res.status(500).send({ error })
    }

    res.json(rows)
  })
})

// Create a user
router.post('/', (req, res) => {
  debug(`POST ${req.path}`, req.body)
  const values = snakeProps(req.body)

  db.insert('user', values, (error, id) => {
    if (error) {
      debug('DB Error', error)
      return res.status(500).send({ error })
    }

    res.json({ id })
  })

})

// Get user by ID
router.get('/:id', (req, res) => {
  debug(`GET ${req.path}`)
  const id = req.params.id

  db.selectFile('get-user', { id }, (error, rows) => {
    if (error) {
      debug('DB Error', error)
      return res.status(500).send({ error })
    }

    res.json(rows)
  })
})

export default router
