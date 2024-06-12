import { notification } from 'antd';
import { FaCircleCheck } from 'react-icons/fa6';
import { MdCancel } from 'react-icons/md';

export const notificateError = (
  message = 'Ops, ocorreu um erro ao realizar essa operação. Tente novamente!'
) => {
  notification.config({ maxCount: 1 });
  notification.error({
    message: message,
    icon: <MdCancel color="red" size={25} />,
    placement: 'top',
    duration: 6,
    closeIcon: null,
  });
};

export const notificateSucess = (
  message = 'Sucesso ao realizar a operação'
) => {
  notification.config({ maxCount: 1 });
  notification.success({
    message: message,
    icon: <FaCircleCheck size={25} color="green" />,
    placement: 'top',
    duration: 3,
    closeIcon: null,
  });
};