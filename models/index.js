// Import all models
const User = require("./User");
const Item = require("./Item");

// Create associations
User.hasMany(Item, {
    foreignKey: 'user_id'
});
Item.belongsTo(User, {
    foreignKey: 'id' // "id" might be wrong? It might need to be "user_id", but that doesn't make sense to me, AND IT NEVER HAS.
});

module.exports = { User, Item };