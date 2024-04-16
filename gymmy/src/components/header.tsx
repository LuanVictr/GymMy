import { Button, Flex } from "antd";

function Header() {
  return (
    <Flex align="center" justify="center">
      <Flex style={{ width: "90%" }} align="center" justify="space-between">
        <h3>GymMy</h3>
        <Flex>
          <Button type="link">Entrar</Button>
          <Button type="primary">Testar Agora</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
