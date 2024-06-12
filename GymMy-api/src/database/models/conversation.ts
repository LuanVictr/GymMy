import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import sequelize from "../../infra/connection";
import User from "./user";

export interface IConversation {
  id: string;
  userId: string;
  title: string;
}

interface ConversationCreationAttributes extends Optional<IConversation, 'id'> {}

  class Conversation extends Model<IConversation, ConversationCreationAttributes> implements IConversation {
    public id!: string;
    public userId!: string;
    public title!: string;
  }

  Conversation.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      userId: DataTypes.UUID,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Conversation",
      paranoid: true,
    }
  );

  Conversation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  export default Conversation;

