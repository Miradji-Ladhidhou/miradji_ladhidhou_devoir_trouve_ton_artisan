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
      allowNull: false,
    },
  },

  {
    timestamps: false 
  }
  );

  // Association avec Categorie et Artisan
  Specialite.associate = (models) => {
    Specialite.belongsTo(models.Categorie, {
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
