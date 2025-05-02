import React, {useState} from 'react';interface ChatInputProps {  onSend: (msg: string) => void;}

export const ChatInput: React.FC<ChatInputProps> = ({onSend}) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <div className='flex gap-2 p-4'>
      <input
        type='text'
        className='flex-1 border-2 border-gray-400 hover:border-[#DE5F02] rounded-sm px-4 py-2 focus:outline-none'
        placeholder='Digite sua mensagem...'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleSend}
        disabled={!text.trim()}
        className='bg-white hover:bg-gray-300 text-[#DE5F02] border-2 border-[#DE5F02] font-bold px-4 py-2 rounded-sm disabled:opacity-30 transition-colors duration-500 ease-in-out'
      >
        Enviar
      </button>
    </div>
  );
};
