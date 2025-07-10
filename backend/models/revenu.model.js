module.exports = (sequelize, DataTypes) => {
    const Revenue = sequelize.define('revenu', {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categorie: {
            type: DataTypes.STRING,
            allowNull: false
        },
        montant: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        dateCreation: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        idDepartement: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'departement',
                key: 'id'
            }
        }
    }, {
        tableName: 'revenu'
    });

    return Revenue;
};