import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, MoreVertical, Trash2 } from 'lucide-react';

const chats = [
  {
    id: 1,
    name: 'Andy Robertson',
    avatar: '/avatars/andy.jpg',
    lastMessage: 'โอเคครับ กรุณาส่งประวัติส่วนตัวของคุณ...',
    timestamp: '5 นาทีที่แล้ว',
    unread: true,
    unreadCount: 2,
  },
  {
    id: 2,
    name: 'Giorgio Chiellini',
    avatar: '/avatars/giorgio.jpg',
    lastMessage: 'สวัสดีครับ, อรุณสวัสดิ์',
    timestamp: '30 นาทีที่แล้ว',
    unread: false,
  },
  {
    id: 3,
    name: 'Alex Morgan',
    avatar: '/avatars/alex.jpg',
    lastMessage: 'เห็นตำแหน่งนักออกแบบ UI/UX...',
    timestamp: '09:30 น.',
    unread: false,
  },
  {
    id: 4,
    name: 'Megan Rapinoe',
    avatar: '/avatars/megan.jpg',
    lastMessage: 'เห็นตำแหน่งนักออกแบบ UI/UX...',
    timestamp: '13:00 น.',
    unread: false,
    showDelete: true,
  },
  {
    id: 5,
    name: 'Alessandro Bastoni',
    avatar: '/avatars/alessandro.jpg',
    lastMessage: 'เห็นตำแหน่งนักออกแบบ UI/UX...',
    timestamp: '18:00 น.',
    unread: false,
  },
  {
    id: 6,
    name: 'Ilkay Gundogan',
    avatar: '/avatars/ilkay.jpg',
    lastMessage: 'เห็นตำแหน่งนักออกแบบ UI/UX...',
    timestamp: 'เมื่อวานนี้',
    unread: false,
  },
];

const ChatHistoryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleChatSelect = (chatId: number) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-yellow-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-8 pb-4">
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-gray-900">ข้อความ</h1>
        </div>
        <div className="absolute right-6 flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-yellow-100" aria-label="สร้างข้อความใหม่">
            <Pencil size={22} className="text-[#f5c518]" />
          </button>
          <button className="p-2 rounded-full hover:bg-yellow-100" aria-label="เพิ่มเติม">
            <MoreVertical size={22} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-6 mb-4">
        <div className="flex items-center bg-white rounded-xl shadow-sm px-4 py-2 border border-gray-100">
          <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="ค้นหาข้อความ"
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 px-2 pb-4 overflow-y-auto">
        {chats.map((chat, idx) => (
          <div
            key={chat.id}
            className="flex items-center px-4 py-3 hover:bg-yellow-50 rounded-2xl transition group relative"
            onClick={() => handleChatSelect(chat.id)}
            style={{ cursor: 'pointer' }}
          >
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border border-gray-100 bg-gray-200 flex items-center justify-center">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(chat.name); }}
              />
            </div>
            {/* Chat info */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900 text-base">{chat.name}</span>
                <span className="text-xs text-gray-400">{chat.timestamp}</span>
              </div>
              <div className="flex items-center mt-1">
                <span className={`text-sm truncate ${chat.unread ? 'text-[#f5c518] font-medium' : 'text-gray-400'}`}>
                  {chat.lastMessage}
                </span>
                {chat.unread && (
                  <span className="ml-2 flex items-center">
                    <span className="w-5 h-5 rounded-full bg-[#f5c518] text-white text-xs flex items-center justify-center font-bold">
                      {chat.unreadCount}
                    </span>
                  </span>
                )}
              </div>
            </div>
            {/* Delete button */}
            {chat.showDelete && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-100 hover:bg-yellow-200 rounded-xl p-3 transition"
                onClick={e => { e.stopPropagation(); /* handle delete here */ }}
                aria-label="ลบแชท"
              >
                <Trash2 className="text-[#f5c518]" size={22} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistoryPage;