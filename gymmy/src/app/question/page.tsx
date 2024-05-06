"use client"

import { useEffect } from 'react';
import Swal from 'sweetalert2'
import "react-chat-elements/dist/main.css"
import { MessageBox } from "react-chat-elements";
import { Flex } from 'antd';
import useUser from '../hooks/useUser';
import checkIsMobile from '@/app/hooks/isMobile';


function QuestionPage () {

  const user = useUser();
  const isMobile = checkIsMobile();
  
  useEffect(() => {
    Swal.fire({
      title: "Importante",
      text: "O Gymmy é uma ferramenta valiosa para seus treinos, porém é fundamental lembrar que ele não substitui a orientação de um profissional habilitado. Consulte sempre um especialista para garantir sua segurança e eficácia nos treinos. Bom treino!",
      icon: "warning",
      confirmButtonText: 'Entendi',
      confirmButtonColor: 'black',
    });
  }, [])

  return (
    <Flex vertical>
      <Flex gap={isMobile ? 50 : 200} align='center' justify='space-around'>
        <h2>Gymmy</h2>
        <h3>{user}</h3>
      </Flex>
      <Flex>
      <p></p>
      </Flex>
    </Flex>
  )
}

export default QuestionPage;