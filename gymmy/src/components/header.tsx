import { Button, Flex, Image } from "antd";
import { useRouter } from "next/navigation";

function Header() {
  const history = useRouter();


  return (
    <Flex align="center" justify="center">
      <Flex style={{ width: "90%" }} align="center" justify="space-between">
        <Image src="/gymmy-logo.png" width={'120px'} alt="Gymmy logo" preview={false} />
        <Flex>
          <Button onClick={() => history.push('/users/login')} type="link">Entrar</Button>
          <Button onClick={() => history.push('/users/register')} shape="round" type="primary">Testar Agora</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
