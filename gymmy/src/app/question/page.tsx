"use client";

import "./styles.min.css";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import "react-chat-elements/dist/main.css";
import { Flex, Image, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import useUser from "../hooks/useUser";
import checkIsMobile from "@/app/hooks/isMobile";
import { TfiMenu } from "react-icons/tfi";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import useQuestion from "../hooks/useQuestion";
import { useRouter } from "next/navigation";
import { notificateError } from "@/app/components/notification";
import useAllConversationsFromUser from "../hooks/UseConversation";
import ConversationsDrawer from "../components/conversationsDrawer";
import useRegisterMessages from "../hooks/UseRegisterMessage";

function QuestionPage() {
  const userInfo = useUser();
  const user = userInfo?.user;
  const token = userInfo?.token;
  const [haveUser, setHaveUser] = useState(false);
  const [conversationId, setConversationId] = useState('');
  const inputRef = useRef<any>(null);
  const [firstMessage, setFirstMessage] = useState(true);
  const { data, refetch } = useAllConversationsFromUser(user?.id, token ? token : '');
  const { mutate: registerMessage, isPending: isLoading } =
    useRegisterMessages(token ? token : '');
  const [msgInputValue, setMsgInputValue] = useState("");
  const [messages, setMessages] = useState<any>([
    {
      message:
        "Opa, sou o Gymmy, me pergunte qualquer coisa sobre exercícios que eu te ajudo.",
      direction: "ongoing",
    },
  ]);
  const { mutate: requestQuestion, isPending } = useQuestion();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>();
  const history = useRouter();

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
        firstMessage: firstMessage,
        message: message,
        sender: "outgoing",
        userId: user?.id,
      },
      {
        onSuccess: (registerData) => {
          refetch();
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
                  conversationId: registerData.conversationId,
                  sender: "ongoing",
                  userId: user?.id,
                });
                setFirstMessage(false);
                setConversationId(registerData.conversationId);
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
    setIsMobile(isMobile);
  }, []);

  useEffect(() => {
    haveUser &&
      Swal.fire({
        title: "Importante",
        text: "O Gymmy é uma ferramenta valiosa para seus treinos, porém é fundamental lembrar que ele não substitui a orientação de um profissional habilitado. Consulte sempre um especialista para garantir sua segurança e eficácia nos treinos. Bom treino!",
        icon: "warning",
        confirmButtonText: "Entendi",
        confirmButtonColor: "black",
      });
  }, [haveUser]);

  return (
    <Flex vertical>
      <ConversationsDrawer refetch={refetch} selected={conversationId} data={data} isMobile={isMobile} open={open} onClose={onClose} />
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
            {messages.map((m: any, i: any) => (
              <Message key={i} model={m} />
            ))}
          </MessageList>
          <MessageInput
            style={{ marginTop: "10px", marginBottom: isMobile ? '30px' : '' }}
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
  );
}

export default QuestionPage;
