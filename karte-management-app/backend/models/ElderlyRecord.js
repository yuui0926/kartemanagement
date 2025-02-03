const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // ✅ 修正: 正しいDB設定をインポート

const ElderlyRecord = sequelize.define('ElderlyRecord', {
    elderly_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "高齢者の名前"
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "年齢（歳）"
    },
    house_number: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "家番号"
    },
    congenital_issues: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "先天性疾患・異常症状"
    },
    group1: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "グループ1（自立可能）"
    },
    group2: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "グループ2（軽度な支援を要する）"
    },
    group3: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "グループ3（介護を要する）"
    },
    health_problems: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "健康上の問題"
    }
}, {
    tableName: 'elderly_records', // ✅ 修正: 正しいテーブル名
    timestamps: true,
});

module.exports = ElderlyRecord; // ✅ 修正: ルートではなくモデルをエクスポート
