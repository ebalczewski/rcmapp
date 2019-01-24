require('dotenv').config()

const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const authRoutes = require('./routes/auth')
const apiRoutes = require('./routes/api')

nextApp.prepare().then(() => {
  const app = express()
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/auth', authRoutes);
  app.use('/api', apiRoutes);

  app.get('*', (req, res) => {
    return handle(req, res);
  })

  app.listen(PORT, err => {
    if (err) throw err;
  })
})

