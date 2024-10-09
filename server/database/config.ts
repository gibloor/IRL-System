import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('desil-apartments', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5444,
});

export default sequelize;