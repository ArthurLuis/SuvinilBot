'use client';import React, {useState, useEffect} from 'react';
import AppScreen from '../components/AppScreen/AppScreen';
import axios from 'axios';

import {Chat} from '../components/Chat/Chat';
import {ChatInput} from '../components/ChatInput/ChatInput';
import Loading from '../components/Loading/Loading';

interface Message {
  sender: 'user' | 'system';
  text: string;
  imageUrls?: string[];
}

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem('sessionId');
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, {sender: 'user', text}]);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/chat', {
        question: text,
        sessionId: sessionId || undefined,
      });

      const {sessionId: newSessionId, reply, imageUrls} = res.data;

      setMessages((prev) => [...prev, {sender: 'system', text: reply}]);

      if (imageUrls && imageUrls.length) {
        setMessages((prev) => [
          ...prev,
          {sender: 'system', text: '', imageUrls},
        ]);
      }

      if (newSessionId) {
        setSessionId(newSessionId);
        localStorage.setItem('sessionId', newSessionId);
      }
    } catch (err) {
      console.error('Erro ao chamar o backend:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppScreen>
      <div className='flex justify-center items-start min-h-screen bg-gray-50 px-4'>
        <div className='w-full max-w-3xl bg-white shadow-lg rounded-xl flex flex-col overflow-hidden mt-20'>
          <div className='flex-1 overflow-y-auto p-4'>
            {messages.length === 0 ? (
              <div className='text-center text-[#DE5F02] font-medium mt-4'>
                Envie uma mensagem para começar a conversa!
              </div>
            ) : (
              <Chat messages={messages} />
            )}
          </div>

          {loading && (
            <div className='flex justify-center my-2'>
              <Loading isLoading={loading} />
            </div>
          )}

          <ChatInput onSend={sendMessage} />
        </div>
      </div>
    </AppScreen>
  );
}
