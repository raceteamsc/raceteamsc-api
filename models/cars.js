'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cars = sequelize.define(
    'Cars',
    {
      name: DataTypes.STRING,
      plate: DataTypes.STRING,
      instagram: DataTypes.STRING,
      member_id: DataTypes.INTEGER,
      createdAt: DataTypes.DATEONLY,
      updatedAt: DataTypes.DATEONLY,
    },
    {},
  );
  Cars.associate = function (models) {
    Cars.belongsTo(models.Members, {
      foreignKey: 'member_id',
    });
  };
  return Cars;
};
