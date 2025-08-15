import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

const ChatHistory: React.FC = () => {
  const navigate = useNavigate();
  
  const chats: Chat[] = [
    { id: 1, name: 'พนักงานร้านอาหาร A', lastMessage: 'สวัสดีครับ สอบถามเรื่องงานหน่อยได้ไหมครับ', timestamp: '10:30', unread: true },
    { id: 2, name: 'ร้านกาแฟ B', lastMessage: 'ขอบคุณสำหรับการทำงานวันก่อนนะครับ', timestamp: '09:15', unread: false },
    { id: 3, name: 'ร้านอาหาร C', lastMessage: 'พรุ่งนี้จะมีงานเพิ่มเติม สนใจไหมครับ', timestamp: 'เมื่อวาน', unread: false },
  ];

  const handleChatSelect = (chatId: number) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      
      
      <div className="flex-1 overflow-y-auto p-4">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageCircle size={48} className="mb-4" />
            <p>ยังไม่มีประวัติการแชท</p>
          </div>
        ) : (
          <div className="space-y-2">
            {chats.map((chat) => (
              <div 
                key={chat.id}
                className="bg-white rounded-lg p-4 shadow-sm flex items-center cursor-pointer hover:bg-gray-50"
                onClick={() => handleChatSelect(chat.id)}
              >
                <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                  <MessageCircle className="text-gray-600" size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread && (
                  <div className="ml-2 w-3 h-3 bg-yellow-500 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;