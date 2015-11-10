import bug from 'debug'
const debug = bug('rockit-express:api')

import path from 'path'
import assign from 'lodash/object/assign'
import dotty from 'dotty'
import express from 'express'

import db from '../../lib/db'
import camelProps from '../../lib/camel-props'

const router = express.Router()

router.get('/:resource', (req, res) => {
  debug(`GET ${req.path}`)
  const resource = dotty.get(req, 'params.resource')
  const sql = `SELECT * FROM ${resource}`

  db.select(sql, (error, rows, fields) => {
    if (error) {
      return res.status(500).send({ error, sql })
    }

    res.json(rows.map(camelProps))
  })
})

router.get('/:resource/:id', (req, res) => {
  debug(`GET ${req.path}`)
  const resource = dotty.get(req, 'params.resource')
  const id = dotty.get(req, 'params.id')
  const sql = `SELECT * FROM ${resource} WHERE ${resource}_id = :id`

  db.select(sql, { id }, (error, rows, fields) => {
    if (error) {
      return res.status(500).send({ error, sql })
    }

    res.json(rows.map(camelProps))
  })
})

router.post('/:resource', (req, res) => {
  debug(`POST ${req.path}`, req.body)
  const resource = dotty.get(req, 'params.resource')
  const payload = dotty.get(req, 'body')

  db.insert(resource, payload, (error, id) => {
    if (error) {
      return res.status(500).send({ error })
    }

    const uri = `${req.originalUrl}/${id}`

    res.location(uri).status(201).send(uri)
  })
})

router.put('/:resource/:id', (req, res) => {
  debug(`PUT ${req.path}`, req.body)
  const resource = dotty.get(req, 'params.resource')
  const id = dotty.get(req, 'params.id')
  const payload = dotty.get(req, 'body')

  db.update(resource, payload, { [`${resource}_id`]: id }, error => {
    if (error) {
      return res.status(500).send({ error })
    }

    res.location(req.originalUrl).sendStatus(200)
  })
})

router.delete('/:resource/:id', (req, res) => {
  debug(`DELETE ${req.path}`)
  const resource = dotty.get(req, 'params.resource')
  const id = dotty.get(req, 'params.id')

  debug('mysql-chassis doesn\'t support delete')
  res.sendStatus(501)
})

export default router
