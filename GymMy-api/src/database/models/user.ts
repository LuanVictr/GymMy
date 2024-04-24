import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import sequelize from "../../infra/connection";

export interface IUser {
  id: string;
  name: string;
  password: string;
}

interface UserCreationAttributes extends Optional<IUser, 'id'> {}

  class User extends Model<IUser, UserCreationAttributes> implements IUser {
    public id!: string;
    public name!: string;
    public password!: string;
  }

  User.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      name: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
    }
  );

  export default User;

