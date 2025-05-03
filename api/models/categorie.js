// models/category.js
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },

    {
      timestamps: false 
    }
  );

  // Association avec Specialite
  Category.associate = (models) => {
    Category.hasMany(models.Specialite, {
      foreignKey: 'categorie_id',
      as: 'specialites',
    });
  };

  return Category;
};
