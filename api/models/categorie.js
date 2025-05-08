module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    tableName: 'categories',
    timestamps: false,
  });

  Categorie.associate = (models) => {
    Categorie.hasMany(models.Specialite, {
      foreignKey: 'categorie_id',
      as: 'specialites',
    });
  };

  return Categorie;
};
