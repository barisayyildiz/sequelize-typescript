'use strict';

import {
	Model
} from "sequelize"

interface DeveloperRepostAttributes {
	id: string;
	DeveloperId: string;
	RepositoryId: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class DeveloperRepos extends Model<DeveloperRepostAttributes> implements DeveloperRepostAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		id!: string;
		DeveloperId!: string;
		RepositoryId!: string;
    static associate(models:any) {
      // define association here
    }
  }
  DeveloperRepos.init({
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
    DeveloperId: {
			type:DataTypes.UUID,
			allowNull:false,
			references:{
				model:'Developers',
				key:'id'
			}
		},
    RepositoryId: {
			type:DataTypes.UUID,
			allowNull:false,
			references:{
				model:'Repositories',
				key:'id'
			}
		}
  }, {
    sequelize,
    modelName: 'DeveloperRepos',
  });
  return DeveloperRepos;
};