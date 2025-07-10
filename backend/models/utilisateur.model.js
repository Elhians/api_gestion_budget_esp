module.exports = (sequelize, DataTypes) => {
    const Utilisateur = sequelize.define('utilisateur', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        motDePasse: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('DIRECTEUR', 'CHEF_DEPARTEMENT', 'ENSEIGNANT', 'AGENT','ADMIN'),
            allowNull: false
        },
        statut: {
            type: DataTypes.ENUM('inactive', 'active'),
            allowNull: false,
            defaultValue: 'inactive'
        },
        dateDeCreation: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        dateDeModification: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW
        },
        
        // Relation 'appartenir a' (un utilisateur peut appartenir à un département)
        idDepartementAppartenance: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'departement',
                key: 'id'
            }
        },

        // Relation 'diriger' (un utilisateur peut diriger un département)
        idDepartementDirection: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
            references: {
                model: 'departement',
                key: 'id'
            }
        },
        resetToken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        resetTokenExpiration: {
            type: DataTypes.DATE,
            allowNull: true
        },
    },
    {
        tableName: 'utilisateur'
    });

    return Utilisateur;
};
