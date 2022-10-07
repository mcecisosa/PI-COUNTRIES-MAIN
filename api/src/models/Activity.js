const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.



module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        min: 1,
        max: 5
      }

    },
    duration:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        min: 1,
        max: 24
      }
    },
    season:{
      type: DataTypes.ENUM('Verano', 'Otoño','Invierno','Primavera'),
      allowNull:false
    }
  });
};
