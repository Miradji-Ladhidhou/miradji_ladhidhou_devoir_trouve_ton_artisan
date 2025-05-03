// models/specialite.js
module.exports = (sequelize, DataTypes) => {
  const Specialite = sequelize.define('Specialite', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    categorie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories', // Correspond à ta table 'categories'
        key: 'id',
      },
    },
  },

  {
    timestamps: false 
  }
  );

  // Association avec Category et Artisan
  Specialite.associate = (models) => {
    Specialite.belongsTo(models.Category, {
      foreignKey: 'categorie_id',
      as: 'categorie',
    });

    Specialite.hasMany(models.Artisan, {
      foreignKey: 'specialite_id',
      as: 'artisans',
    });
  };

  return Specialite;
};
