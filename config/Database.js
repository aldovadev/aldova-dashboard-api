import { Sequelize } from "sequelize";

const db = new Sequelize("aldovadb", "root", "Inandita99", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
