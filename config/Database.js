import { Sequelize } from "sequelize";

const db = new Sequelize("aldovadb", "root", process.env.PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

export default db;
