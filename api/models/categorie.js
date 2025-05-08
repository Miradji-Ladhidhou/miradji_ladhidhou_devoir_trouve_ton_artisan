module.exports = (sequelize, DataTypes) => {
  const categorie = sequelize.define('categorie', {
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
    timestamps: false,
    tableName: 'categories',
  });

  categorie.associate = (models) => {
    categorie.hasMany(models.Specialite, {
      foreignKey: 'categorie_id',
      as: 'specialites',
    });
  };

  return categorie;
};
