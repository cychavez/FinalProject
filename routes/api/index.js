import bug from 'debug'
const debug = bug('express-server:api')

import path from 'path'
import assign from 'lodash/object/assign'
import dotty from 'dotty'
import express from 'express'

import db from '../../lib/db'

const router = express.Router()

router.get('/:resource', (req, res) => {
  const resource = dotty.get(req, 'params.resource')

  db.selectFile(resource, (error, rows, fields) => {
    if (error) {
      return res.status(500).send({ error })
    }

    res.json(rows)
  })
})

router.get('/:resource/:id', (req, res) => {
  const resource = dotty.get(req, 'params.resource')
  const id = dotty.get(req, 'params.id')

  db.selectFile(resource, { id }, (error, rows, fields) => {
    if (error) {
      return res.status(500).send({ error })
    }

    res.json(rows)
  })
})

router.post('/:resource', (req, res) => {
  const resource = dotty.get(req, 'params.resource')
  const payload = dotty.get(req, 'body')

  db.insert(resource, payload, (error, id) => {
    if (error) {
      return res.status(500).send({ error })
    }

    res.json({ id })
  })
})

router.put('/:resource/:id', (req, res) => {
  const resource = dotty.get(req, 'params.resource')
  const id = dotty.get(req, 'params.id')
  const payload = dotty.get(req, 'body')

  db.update(resource, payload, { [`${resource}_id`]: id }, (error, rows) => {
    if (error) {
      return res.status(500).send({ error })
    }

    res.json(rows)
  })
})

router.delete('/:resource/:id', (req, res) => {
  const resource = dotty.get(req, 'params.resource')
  const id = dotty.get(req, 'params.id')

  debug('mysql-chassis doesn\'t support delete')
})

export default router
