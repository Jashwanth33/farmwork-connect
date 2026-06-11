'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MessageCircle, Send, Image, MapPin, Search, MoreVertical,
  Check, CheckCheck, Phone, ArrowLeft, User
} from 'lucide-react';

const MOCK_CHATS = [
  { id: '1', name: 'Krishna Farms', lastMessage: 'I will reach by 9 AM', time: '2 min ago', unread: 2, avatar: null },
  { id: '2', name: 'Green Spray Team', lastMessage: 'Please confirm the booking', time: '1 hour ago', unread: 0, avatar: null },
  { id: '3', name: 'Ravi Transport', lastMessage: 'Thank you!', time: 'Yesterday', unread: 0, avatar: null },
  { id: '4', name: 'Happy Harvesters', lastMessage: 'Work completed', time: 'Yesterday', unread: 0, avatar: null },
];

const MOCK_MESSAGES = [
  { id: '1', senderId: 'provider', message: 'Hello! I am available for the booking.', time: '10:30 AM', isRead: true },
  { id: '2', senderId: 'me', message: 'Great! Can you come tomorrow morning?', time: '10:32 AM', isRead: true },
  { id: '3', senderId: 'provider', message: 'Yes, I can come at 9 AM. Is that okay?', time: '10:35 AM', isRead: true },
  { id: '4', senderId: 'me', message: 'Perfect! See you then.', time: '10:36 AM', isRead: true },
  { id: '5', senderId: 'provider', message: 'I will reach by 9 AM', time: '10:40 AM', isRead: false },
];

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<typeof MOCK_CHATS[0] | null>(null);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = MOCK_CHATS.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now().toString(),
      senderId: 'me',
      message: newMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      isRead: false,
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600">Chat with service providers</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="flex h-full">
          {/* Chat List */}
          <div className={`w-full md:w-1/3 border-r border-gray-100 flex flex-col ${selectedChat ? 'hidden md:flex' : ''}`}>
            {/* Search */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition border-b border-gray-50 ${
                    selectedChat?.id === chat.id ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                    {chat.name[0]}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">{chat.name}</p>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          {selectedChat ? (
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => setSelectedChat(null)} className="md:hidden p-2 -ml-2">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                    {selectedChat.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{selectedChat.name}</p>
                    <p className="text-xs text-green-600">Online</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl ${
                        msg.senderId === 'me'
                          ? 'gradient-bg text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                      }`}
                    >
                      <p>{msg.message}</p>
                      <div className={`flex items-center gap-1 mt-1 text-xs ${
                        msg.senderId === 'me' ? 'text-primary-100' : 'text-gray-400'
                      }`}>
                        <span>{msg.time}</span>
                        {msg.senderId === 'me' && (
                          msg.isRead ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <button className="p-3 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl">
                    <Image className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={handleSend}
                    className="p-3 gradient-bg text-white rounded-xl hover:opacity-90 transition"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Select a conversation</h3>
                <p className="text-gray-500">Choose a chat to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
