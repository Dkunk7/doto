const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Creat Item model
class Item extends Model {}

Item.init(
    {
        item_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            // Maybe add length validation or something at some point?
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
        // Possibly add priority level later?
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "item"
    }
);

module.exports = Item;