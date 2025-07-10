module.exports = (sequelize, DataTypes) => {
    const Besoin = sequelize.define('besoin', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        categorie: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cout: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        statut: {
            type: DataTypes.ENUM('Soumis', 'Consolide', 'Approuve','Rejete par CDepartement','Rejete par Direction'),
            defaultValue: 'Soumis',
            allowNull: false,
        },
        dateSoumission: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        idAuteur: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'utilisateur',
                key: 'id'
            }
        }
    }, {
        tableName: 'besoin'
    });

    return Besoin;
};