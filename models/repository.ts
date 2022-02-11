'use strict';

import {
	Model
} from "sequelize"

interface RepositoryAttributes {
	id: string;
	title: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Repository extends Model<RepositoryAttributes> implements RepositoryAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!: string;
		title!: string;
    static associate(models:any) {
      // define association here
			Repository.belongsTo(models.Developer,{
				foreignKey:{
					name:"DeveloperId",
					allowNull:false
				},
				as:'developer'
			})
			Repository.belongsToMany(models.Developer, {through:'DeveloperRepos', as:'contribution'})
    }
  }
  Repository.init({
    id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		title:{
			type:DataTypes.STRING,
			allowNull:false
		}
  }, {
    sequelize,
    modelName: 'Repository',
  });
  return Repository;
};