import fs from "fs";
import https from "https";
import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
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
