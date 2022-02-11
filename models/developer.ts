'use strict';

import {
	Model
} from "sequelize"

interface DeveloperAttributes {
	id: string;
	username: string;
	password: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Developer extends Model<DeveloperAttributes> implements DeveloperAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!: string;
		username!: string;
		password!: string;
    static associate(models:any) {
      // define association here
			Developer.hasMany(models.Repository, {as:'repository', onDelete:'CASCADE', hooks:true})
			Developer.belongsToMany(models.Repository, {through:'DeveloperRepos', as:'contribution'})
    }
  }
  Developer.init({
    id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
    username: {
			type:DataTypes.STRING,
			allowNull:false
		},
		password: {
			type:DataTypes.STRING,
			allowNull:false
		},
  }, {
    sequelize,
    modelName: 'Developer',
  });
  return Developer;
};