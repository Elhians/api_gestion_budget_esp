const { toDefaultValue } = require("sequelize/lib/utils");

module.exports = (sequelize, DataTypes) => {
    const Departement = sequelize.define('departement', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        budget: {
            type: DataTypes.INTEGER,
            defaultValue:0,
        },
    }, {
        tableName: 'departement'
    });

    return Departement;
};
