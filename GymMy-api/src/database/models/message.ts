import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import sequelize from "../../infra/connection";
import Conversation from "./conversation";

export interface IMessages {
  id: string;
  conversationId: string;
  sender: string;
  message: string;
}

interface MessagesCreationAttributes extends Optional<IMessages, 'id'> {}

  class Messages extends Model<IMessages, MessagesCreationAttributes> implements IMessages {
    public id!: string;
    public conversationId!: string;
    public sender!: string;
    public message!: string;
  }

  Messages.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      conversationId: DataTypes.UUID,
      sender: DataTypes.STRING,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Messages",
      paranoid: true,
    }
  );

  Messages.belongsTo(Conversation, { foreignKey: 'conversationId', as: 'conversation' });

  export default Messages;

