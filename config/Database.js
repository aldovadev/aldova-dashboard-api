import { Sequelize } from "sequelize";

const db = new Sequelize("aldovadb", process.env.USER, process.env.PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

export default db;
