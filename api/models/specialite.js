module.exports = (sequelize, DataTypes) => {
  const specialite = sequelize.define('specialite', {
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
  }, {
    timestamps: false,
    tableName: 'specialites',
  });

  specialite.associate = (models) => {
    specialite.belongsTo(models.Categorie, {
      foreignKey: 'categorie_id',
      as: 'categorie',
    });

    specialite.hasMany(models.Artisan, {
      foreignKey: 'specialite_id',
      as: 'artisans',
    });
  };

  return specialite;
};
