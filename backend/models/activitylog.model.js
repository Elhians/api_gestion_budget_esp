module.exports = (sequelize, DataTypes) => {
    const ActivityLog = sequelize.define('activityLog', {
        dateHeure: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false
        },
        details: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        adresseIp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        idUtilisateur: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'utilisateur',
                key: 'id'
            }
            }
    }, {
        tableName: 'activity_log'
    });

    return ActivityLog;
};