require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')

const credentials = {
  client: {
    id: process.env.RECURSE_ID,
    secret: process.env.APP_PASSWORD
  },
  auth: {
    tokenHost: process.env.TOKEN_HOST,
    authorizePath: process.env.AUTHORIZE_PATH,
    tokenPath: process.env.TOKEN_PATH
  }
}

const oauth2 = require('simple-oauth2').create(credentials);

const authUrl = oauth2.authorizationCode.authorizeURL({
  redirect_uri: process.env.REDIRECT_URI
});

module.exports = {
  serverRuntimeConfig: {
      rc: {
        client_id: process.env.RECURSE_ID,
        client_secret: process.env.SECRET_KEY,
        redirect_uri: process.env.REDIRECT_URI
      },
  },
  publicRuntimeConfig: {
    authUrl: authUrl,
    redirect_uri: process.env.REDIRECT_URI
  },
  webpack: config => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]

    return config
  }
}
