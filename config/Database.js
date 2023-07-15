import { Sequelize } from "sequelize";

const db = new Sequelize("aldovadb", "admin", "Inandita99", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
