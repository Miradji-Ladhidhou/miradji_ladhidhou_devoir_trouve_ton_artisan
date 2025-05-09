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
        model: 'categories',
        key: 'id',
      },
    },
  },
  {
    tableName: 'specialites',
    timestamps: false 
  });

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
