import { serve } from '@hono/node-server'
import { Hono } from 'hono'
require('dotenv').config()

//* APP
const app = new Hono()

//* Introduction
app.get('/', (c) => {
  return c.text('Welcome to Free APIs!')
})

//* Routes 
import github from "./routes/github"
import weather from "./routes/weather"
import hackerNews from "./routes/hackernews"

//* END POINTS
app.route('/github', github) // GitHub
app.route('/weather', weather) // Weather
app.route('/hackernews', hackerNews) // Hacker News

//* ERROR HANDLING
app.onError((err, c) => {
  console.error(`${err}`)
  return c.json(err.message)
})

//* PORT
var port = Number.parseInt(process.env.PORT!) || 7000;
console.log(`Server is running on port ${port}`)

//* SERVER
serve({
  fetch: app.fetch,
  port
})

export default app;