"use client";

import useAllConversationsFromUser, {
  IConversation,
} from "@/app/hooks/UseConversation";
import useUser from "@/app/hooks/useUser";
import { Button, Collapse, CollapseProps, Drawer, Flex } from "antd";
import ConversationConteiner from "./conversationConteiner";
import { BiLogOut } from "react-icons/bi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function ConversationsDrawer({
  open,
  onClose,
  isMobile,
  selected,
  data,
  refetch,
}: {
  open: boolean;
  onClose: () => void;
  isMobile: boolean | undefined;
  selected?: string;
  data: any;
  refetch: any;
}) {
  const userInfo = useUser();
  const user = userInfo?.user;
  const token = userInfo?.token;
  const history = useRouter();

  return (
    <Drawer
      title={
        <Flex align="center" justify="space-between">
          <p>{user?.name}</p>
          <Button
            size={isMobile ? "middle" : "large"}
            onClick={() => history.push('/')}
            style={{
              display: 'flex',
              alignItems:'center',
              backgroundColor: "#F7BC45",
              borderRadius: "10px",
              border: "none",
            }}
          >
            <BiLogOut style={{ fontSize: "15px", alignSelf: 'center' }} />
          </Button>
        </Flex>
      }
      onClose={onClose}
      open={open}
      placement="left"
    >
      <h1 style={{ color: "#F7BC45" }}>Suas Perguntas</h1>
      <Flex vertical>
        {data?.map((conversation: IConversation, index: number) => (
          <ConversationConteiner
            refetch={refetch}
            selected={selected === conversation.id}
            title={conversation.title}
            id={conversation.id}
            key={conversation.id}
          />
        ))}
      </Flex>
    </Drawer>
  );
}

export default ConversationsDrawer;

// Modificar o drawer para ter as opções do usuario deslogar, criar uma conversa, passar o close do drawer para a direita
// por as conversas para serem enviadas em ordem crescente de tempo na api testar e dar deploy
