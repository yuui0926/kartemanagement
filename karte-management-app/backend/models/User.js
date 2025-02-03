const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

// ユーザーモデル
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // 自動インクリメント
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // ユニーク制約
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true, // createdAt, updatedAt を自動管理
});

// パスワードを保存前にハッシュ化
User.beforeCreate(async (user) => {
  if (user.password && !user.password.startsWith('$2a$')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});


// パスワード比較メソッド
User.prototype.comparePassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = User;
