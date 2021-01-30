module.exports = (sequelize, DataTypes) => {
    return sequelize.define('csa', {
        
        csaName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zipcode: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        produce: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true
        }



    })
    
}