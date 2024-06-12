"use client";

import { Dropdown, Flex, MenuProps } from "antd";
import { FaTrashAlt, FaComment } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { useRouter } from "next/navigation";
import { SlOptionsVertical } from "react-icons/sl";
import { HiOutlineTrash } from "react-icons/hi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Swal from "sweetalert2";
import useDeleteConversation from "../hooks/UseDeleteConversation";
import { notificateError, notificateSucess } from "./notification";

function ConversationConteiner({
  title,
  id,
  selected,
  refetch
}: {
  title: string;
  id: string;
  selected: boolean;
  refetch:any;
}) {
  const token = localStorage.getItem("token") || "";
  const { mutate: deleteConversation } = useDeleteConversation(token);
  const history = useRouter();
  const items: MenuProps["items"] = [
    {
      label: (
        <Flex gap={8} align="center">
          <HiOutlineTrash /> Excluir
        </Flex>
      ),
      key: "exclude",
      onClick: (info) =>
        Swal.fire({
          title: "Tem certeza?",
          text: "Tem certeza que deseja excluir a pergunta?",
          icon: "warning",
          confirmButtonText: "Sim",
          confirmButtonColor: "green",
          showCancelButton: true,
          cancelButtonText: "Não",
          cancelButtonColor: "red",
        }).then((result) => {
          if (result.isConfirmed) {
            deleteConversation(id, {
              onSuccess: () => {
                refetch();
                notificateSucess("Conversa excluida com sucesso");
              },
              onError: () => {
                notificateError(
                  "Houve um erro ao excluir essa conversa, tente novamente!"
                );
              },
            });
          }
        }),
    },
    // {
    //   label: (
    //     <Flex gap={8} align="center">
    //       <MdDriveFileRenameOutline />
    //       Renomear
    //     </Flex>
    //   ),
    //   key: "rename",
    // },
  ];

  return (
    <Flex
      align="center"
      justify="space-between"
      style={{
        borderRadius: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        textAlign: "left",
        cursor: "pointer",
        border: selected ? "1px solid #F7BC45" : "none",
      }}
    >
      <TfiCommentAlt />
      <p onClick={() => history.push(`/question/${id}`)} style={{ width: "85%" }}>
        {title.length > 40 ? title.slice(0, 38) + "..." : title}
      </p>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <SlOptionsVertical />
      </Dropdown>
    </Flex>
  );
}

export default ConversationConteiner;
