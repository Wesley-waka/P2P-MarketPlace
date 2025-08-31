import { onMounted, onUnmounted } from 'vue';
import useConversation from '../zustand/useConversation';
import notificationSound from '/Sounds/notification.mp3';

const useListenMessages = () => {
  const { socket } = useSocketStore();
  const { messages, setMessages } = useConversation();

  onMounted(() => {
    const handleNewMessage = (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages.value, newMessage]);
    };

    socket?.on('newMessage', handleNewMessage);

    onUnmounted(() => {
      socket?.off('newMessage', handleNewMessage);
    });
  });
};

export default useListenMessages;