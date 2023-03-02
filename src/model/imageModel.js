const { DataTypes } = require('sequelize');

function image(sequelize) {
    const attributes = {
        image_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          file_name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          date_created: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          s3_bucket_path: {
            type: DataTypes.STRING,
            allowNull: false,
          }
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withPassword: { attributes: {}, }
        }
    };
    return sequelize.define('Image', attributes, options);
}

module.exports = image;
