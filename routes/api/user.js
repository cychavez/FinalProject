// Misc
import bug from 'debug'
const debug = bug('express-server:api')

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
    res.json(rows)
  })
})

// Create a user
router.post('/', (req, res) => {
  const params = req.body

  var values = {}
  values.first_name = params.firstName
  values.last_name = params.lastName
  values.email = params.email

  db.insert('user', values, (error, id) => {
    if (error) {
      return res.status(500).send({ error })
    }
    res.json({id: id})
  })

})

// Get one user
router.get('/:id', (req, res) => {
  var id = req.params.id
  db.selectFile('get-user', { id }, (error, rows) => {
    if (error) {
      return res.status(500).send({ error })
    }
    res.json(rows)
  })
})

export default {
  init: function(app) {
    app.use('/api/users', router)
  }
}