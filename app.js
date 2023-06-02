const express = require('express')
const app = express()
app.use(express.json())

let envelopes = [
  { id: 1, name: 'Groceries', budget: 250 },
  { id: 2, name: 'Eating out', budget: 100 },
  { id: 3, name: 'Rent', budget: 1000 }
]

app.get('/envelopes', (req, res) => {
  res.send(envelopes)
})

app.get('/envelopes/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const envelope = envelopes.find(envelope => envelope.id === id)
  res.send(envelope)
})


app.post('/envelopes', (req, res) => {
  const id = Math.max(...envelopes.map(envelope => envelope.id)) + 1
  const envelope = {}
  envelope.id = id
  envelope.name = req.body.name
  envelope.budget = req.body.budget
  envelopes.push(envelope)
  res.send(envelope)
})

app.put('/envelopes/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const envelope = envelopes.find(envelope => envelope.id === id)
  envelope.id = id 
  envelope.name = req.body.name
  envelope.budget = req.body.budget
  envelopes.splice(envelope, 1, envelope)
  res.send(envelope)
})

app.delete('/envelopes/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const envelope = envelopes.find(envelope => envelope.id === id)
  const index = envelopes.indexOf(envelope)
  envelopes.splice(index, 1)
  res.send(envelope)
})

app.listen(3000, () => console.log('Server ready'))

