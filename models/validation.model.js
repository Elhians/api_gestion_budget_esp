module.exports = (sequelize, DataTypes) => {
    const Validation = sequelize.define('validation', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        source: {
            type: DataTypes.ENUM('ENSEIGNANT', 'AGENT', 'CHEF_DEPARTEMENT', 'DIRECTEUR'),
            allowNull: false
        },
        statut: {
            type: DataTypes.ENUM('EN_ATTENTE', 'VALIDÉ', 'Rejete'),
            allowNull: false,
            defaultValue: 'EN_ATTENTE'
        },
        commentaire: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        dateValidation: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        besoinId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'besoin',
                key: 'id'
            }
        },
        idValidateur: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'utilisateur',
                key: 'id'
            }
        }
    }, {
        tableName: 'validation'
    });

    return Validation;
};
