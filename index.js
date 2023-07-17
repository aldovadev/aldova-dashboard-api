const fs = require("fs");
const https = require("https");
const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const db = require("./config/Database.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const UserRoute = require("./routes/UserRoute.js");
const ProductRoute = require("./routes/ProductRoute.js");
const AuthRoute = require("./routes/AuthRoute.js");
dotenv.config();

const app = express();

const sessionStore = new SequelizeStore({ db });

(async () => {
  await db.sync();
})();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      secure: true, // Set secure attribute to true for HTTPS
      sameSite: "none", // Set SameSite attribute to "none" for cross-site requests
    },
  })
);

app.use(express.json(), UserRoute, ProductRoute, AuthRoute);

// Read the SSL certificate and private key files
const privateKey = fs.readFileSync("path/to/private-key.pem", "utf8");
const certificate = fs.readFileSync("path/to/certificate.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

// Create an HTTPS server with the credentials
const httpsServer = https.createServer(credentials, app);

// Start the server on the desired port (e.g., 443 for HTTPS)
httpsServer.listen(process.env.APP_PORT, () => {
  console.log("HTTPS server running on port 443");
});
