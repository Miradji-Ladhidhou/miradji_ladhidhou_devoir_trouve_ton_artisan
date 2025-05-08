// Artisan model definition
module.exports = (sequelize, DataTypes) => {
  const Artisan = sequelize.define('Artisan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    specialite_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'specialites',
        key: 'id',
      },
      allowNull: false,
    },
    note: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: true,
      validate: {
        min: 0,
        max: 5,
      },
    },
    ville: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    a_propos: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    site_web: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    tableName: 'artisans',
    timestamps: false 
  });

  // Association avec Specialite
  Artisan.associate = (models) => {
    Artisan.belongsTo(models.Specialite, {
      foreignKey: 'specialite_id',
      as: 'specialite',
    });
  };

  return Artisan;
};
