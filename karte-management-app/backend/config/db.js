const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    port: process.env.DB_PORT || 3306,
    dialectOptions: {
      charset: 'utf8mb4', // 文字セットをutf8mb4に設定
    },
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci', // 照合順序をutf8mb4_general_ciに設定
    },
    logging: false, // 必要に応じてログ出力を無効化
  }
);

sequelize.authenticate()
  .then(() => console.log('MySQL Connected'))
  .catch(err => console.error('MySQL Connection Error:', err));

module.exports = sequelize;
