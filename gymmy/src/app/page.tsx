"use client"

import { Button, Flex } from "antd";
import Header from "@/app/components/header";
import useMedia from "use-media-antd-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import checkIsMobile from "./hooks/isMobile";

export default function Home() {
  
  const history = useRouter();
  const [isMobile, setIsMobile] = useState<boolean>()

  useEffect(() => {
    const isMobile = checkIsMobile();

    setIsMobile(isMobile)
  }, [])

  return (
    <Flex vertical>
      <Header />
      <Flex style={{ width: "100%", height: "100%" }} vertical>
        <Flex align="center" justify="center" style={{ height: isMobile ? '60vh' : '80vh',}} vertical>
          <Flex
            vertical
            align="center"
            justify="center"
            style={{ width: "90%", textAlign: "center" }}
          >
            <h1 style={{fontSize: isMobile ? '2.5rem' : '4.5rem'}}>
              Sua própria inteligência artificial <br /> para te ajudar <br /> nos seus
              exercícios
            </h1>
            <p style={{fontSize: '1.125rem'}}>Tire dúvidas enquanto seu instrutor está ocupado.</p>
          </Flex>
          <Button onClick={() => history.push('/users/register')} shape="round" type="primary">Testar Agora</Button>
        </Flex>

        <Flex align="center" justify="center" style={{ height: "" }} vertical>
          <Flex
            vertical
            align="center"
            justify="center"
            style={{ width: "80%", textAlign: "center" }}
          >
            <p></p>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
