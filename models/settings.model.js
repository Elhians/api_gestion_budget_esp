module.exports = (sequelize, DataTypes) => {
    const Settings = sequelize.define('settings', {
        anneeBudgetaire: {
            type: DataTypes.STRING,
            defaultValue: new Date().getFullYear().toString()
        },
        dateLimiteSoumission: {
            type: DataTypes.DATEONLY,
            defaultValue: new Date(new Date().getFullYear(), 2, 15)
        },
        notificationsActivees: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        devise: {
            type: DataTypes.STRING,
            defaultValue: 'XOF'
        }
    }, {
        tableName: 'settings'
    });

    return Settings;
};