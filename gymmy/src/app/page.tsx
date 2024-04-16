import Image from "next/image";
import styles from "./page.module.css";
import { Flex } from "antd";
import Header from "@/components/header";

export default function Home() {
  return (
    <Flex vertical>
      <Header />
      <Flex style={{ width: "100%", height: "100%" }} vertical>
        <Flex
          align="center"
          justify="center"
          style={{ height: "50%" }}
          vertical
        >
          <Flex vertical align="center" justify="center" style={{width:'80%', textAlign:'center'}}>
            <h1>
              Sua própria inteligência artificial para te ajudar nos seus
              exercícios
            </h1>
            <p>Uma ajuda para quando seu instrutor estiver ocupado.</p>
          </Flex>
        </Flex>

        <Flex>
          <p>Testando again</p>
        </Flex>
      </Flex>
    </Flex>
  );
}
