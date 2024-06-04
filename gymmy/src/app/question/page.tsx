"use client";

import "./styles.min.css";

import { useEffect, useRef, useState } from "react";

import Swal from "sweetalert2";
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
import { Flex, Image, Button } from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import useUser from "../hooks/useUser";
import checkIsMobile from "@/app/hooks/isMobile";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import useQuestion from "../hooks/useQuestion";
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { notificateError } from "@/components/notification";

function QuestionPage() {
  const user = useUser();
  const [haveUser, setHaveUser] = useState(false);
  const inputRef = useRef<any>(null);
  const [msgInputValue, setMsgInputValue] = useState("");
  const [messages, setMessages] = useState<any>([{message: 'Opa, sou o Gymmy, me pergunte qualquer coisa sobre exercícios que eu te ajudo.', direction: 'ongoing'}]);
  const {mutate: requestQuestion, isPending } = useQuestion();
  const [isMobile, setIsMobile] = useState<boolean>();
  const history = useRouter();

  useEffect(() => {
    if(!user) {
      notificateError('Sua sessão expirou, faça login novamente')
      history.push('/users/login');
    } else {
      setHaveUser(true);
    }
  }, []);

  const handleSend = (message: string) => {
    setMessages( (prevMessages:any) => [...prevMessages, { message, direction: "outgoing" }]);
    setMsgInputValue("");
    inputRef.current?.focus();
    requestQuestion({question: message}, {
      onSuccess: (data) => {
        setMessages( (prevMessages:any) => [...prevMessages, {message: data, direction: 'ongoing'}]);
      },
      onError: () => {
        console.log('deu bom n')
      }
    });
};

  useEffect(() => {
    const isMobile = checkIsMobile();

    setIsMobile(isMobile);
  }, []);

  useEffect(() => {
    haveUser && Swal.fire({
      title: "Importante",
      text: "O Gymmy é uma ferramenta valiosa para seus treinos, porém é fundamental lembrar que ele não substitui a orientação de um profissional habilitado. Consulte sempre um especialista para garantir sua segurança e eficácia nos treinos. Bom treino!",
      icon: "warning",
      confirmButtonText: "Entendi",
      confirmButtonColor: "black",
    });
  }, [haveUser]);

  return (
    <Flex vertical>
      <Flex gap={isMobile ? 50 : 200} align="center" justify="space-around">
      <Button
      icon={<LogoutOutlined />}
      type="primary"
      onClick={() => history.push('/')}
      size={isMobile ? 'middle' : 'large'}
      style={{
        backgroundColor: '#F7BC45',
        borderRadius: '10px',
        border: 'none',
      }}
    >
    </Button>
      <Image src="/gymmy-logo.png" width={'120px'} alt="Gymmy logo" preview={false} />
        <h3>{user}</h3>
      </Flex>
      <Flex>
        <ChatContainer
          style={{ height: "80vh", width: "100%" }}
        >
          <MessageList typingIndicator={isPending && <TypingIndicator content="Gymmy está digitando" />}>
            {messages.map((m: any, i: any) => (
              <Message key={i} model={m} />
            ))}
          </MessageList>
          <MessageInput
              style={{marginTop: '10px'}}
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