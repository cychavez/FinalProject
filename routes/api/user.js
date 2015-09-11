// Debugging
import bug from 'debug'
const debug = bug('express-server:api:user')

// Database
import db from '../../lib/db'

// Router
import express from 'express'
const router = express.Router()

// List all users
router.get('/', (req, res) => {
  db.selectFile('all-users', (error, rows, fields) => {
    if (error) {
      return res.status(500).send({ error })
    }

    res.json({ rows, fields })
  })
})

// Create a user
router.post('/', (req, res) => {
  const params = req.body
  const values = {}

  values.first_name = params.firstName
  values.last_name = params.lastName
  values.email = params.email

  db.insert('user', values, (error, id) => {
    if (error) {
      return res.status(500).send({ error })
    }

    res.json({ id })
  })

})

// Get user by ID
router.get('/:id', (req, res) => {
  const id = req.params.id

  db.selectFile('get-user', { id }, (error, rows) => {
    if (error) {
      return res.status(500).send({ error })
    }

    res.json(rows)
  })
})

export default router
