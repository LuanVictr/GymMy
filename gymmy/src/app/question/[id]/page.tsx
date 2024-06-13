"use client"

import "../styles.min.css";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import "react-chat-elements/dist/main.css";
import { Flex, Image, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import useUser from "../../hooks/useUser";
import checkIsMobile from "@/app/hooks/isMobile";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import useQuestion from "../../hooks/useQuestion";
import { useRouter } from "next/navigation";
import { notificateError } from "@/app/components/notification";
import useAllConversationsFromUser, {
  IConversation,
} from "../../hooks/UseConversation";
import ConversationsDrawer from "../../components/conversationsDrawer";
import useAllMessagesFromConversation, {
  IMessage,
} from "@/app/hooks/UseMessages";
import useRegisterMessages from "../../hooks/UseRegisterMessage";
import { TfiMenu } from "react-icons/tfi";

interface Props {
  params: { id: string };
}

function QuestionPageId({ params }: Props) {
  const userInfo = useUser();
  const user = userInfo?.user;
  const token = userInfo?.token;
  const conversationId = params.id;
  const [haveUser, setHaveUser] = useState(false);
  const inputRef = useRef<any>(null);
  const { data: dataConversation, refetch } = useAllConversationsFromUser(user?.id, token ? token : '');
  const { mutate: registerMessage, isPending: isFetching } =
  useRegisterMessages(token ? token : '');
  const { data, isLoading, isFetched } = useAllMessagesFromConversation(
    params.id,
    token ? token : ''
  );
  const [msgInputValue, setMsgInputValue] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const { mutate: requestQuestion, isPending } = useQuestion();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>();
  const history = useRouter();

  [
    {
      message:
        "Opa, sou o Gymmy, me pergunte qualquer coisa sobre exercícios que eu te ajudo.",
      direction: "ongoing",
    },
  ];

  useEffect(() => {
    if (isFetched) {
      setMessages(
        data?.map((message: IMessage) => ({
          message: message.message,
          direction: message.sender,
        }))
      );
    }
  }, [isFetched, data]);

  useEffect(() => {
    if (!user) {
      notificateError("Sua sessão expirou, faça login novamente");
      history.push("/users/login");
    } else {
      setHaveUser(true);
    }
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSend = (message: string) => {
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message, direction: "outgoing" },
    ]);
    setMsgInputValue("");
    registerMessage(
      {
        firstMessage: false,
        message: message,
        sender: "outgoing",
        conversationId: conversationId,
        userId: user?.id,
      },
      {
        onSuccess: (registerData) => {
          inputRef.current?.focus();
          requestQuestion(
            { question: message },
            {
              onSuccess: (data) => {
                setMessages((prevMessages: any) => [
                  ...prevMessages,
                  { message: data, direction: "ongoing" },
                ]);
                registerMessage({
                  firstMessage: false,
                  message: data,
                  conversationId: conversationId,
                  sender: "ongoing",
                  userId: user?.id,
                });
              },
              onError: () => {
                console.log("deu bom n");
              },
            }
          );
        },
      }
    );
  };

  useEffect(() => {
    const isMobile = checkIsMobile();
    console.log(isMobile);
    setIsMobile(isMobile);
  }, []);

  return (
    isFetched && (
      <Flex vertical>
        <ConversationsDrawer refetch={refetch} data={dataConversation} selected={conversationId} isMobile={isMobile} open={open} onClose={onClose} />
        <Flex
        style={{ margin: "8px" }}
        gap={isMobile ? 50 : 200}
        align="center"
        justify="space-around"
      >
        <Button
          type="primary"
          size={isMobile ? "middle" : "large"}
          style={{
            backgroundColor: "#F7BC45",
            borderRadius: "10px",
            border: "none",
          }}
          onClick={showDrawer}
        >
          <TfiMenu />
        </Button>
        <Image
          src="/gymmy-logo.png"
          width={"120px"}
          alt="Gymmy logo"
          preview={false}
        />
        <Button
          type="primary"
          onClick={() => history.push("/question")}
          size={isMobile ? "middle" : "large"}
          style={{
            backgroundColor: "#F7BC45",
            borderRadius: "10px",
            border: "none",
          }}
        >
          Nova pergunta
        </Button>
      </Flex>
        <Flex>
          <ChatContainer style={{ height: "80vh", width: "100%" }}>
            <MessageList
              typingIndicator={
                isPending && <TypingIndicator content="Gymmy está digitando" />
              }
            >
              {messages?.map((m: any, i: any) => (
                <Message key={i} model={m} />
              ))}
            </MessageList>
            <MessageInput
              style={{ marginTop: "10px" }}
              attachButton={false}
              placeholder="digite sua duvida..."
              onSend={handleSend}
              onChange={setMsgInputValue}
              value={msgInputValue}
              ref={inputRef}
            />
          </ChatContainer>
        </Flex>
      </Flex>
    )
  );
}

export default QuestionPageId;
