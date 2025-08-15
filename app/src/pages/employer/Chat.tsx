import React, { useMemo, useRef, useState, useEffect } from 'react';
import { MessageCircle, Search, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Message = {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
};

type Conversation = {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  unread?: number;
  messages: Message[];
};

const sampleConversations: Conversation[] = [
  {
    id: 'c1',
    name: 'สมชาย พนักงานพาร์ทไทม์',
    lastMessage: 'ขอรายละเอียดงานเพิ่มเติมครับ',
    unread: 2,
    messages: [
      { id: 'm1', sender: 'them', text: 'สวัสดีครับ สนใจงานที่ลงไว้', time: '09:41' },
      { id: 'm2', sender: 'me', text: 'สวัสดีครับ ตำแหน่งพาร์ทไทม์รายชั่วโมง', time: '09:42' },
      { id: 'm3', sender: 'them', text: 'ขอรายละเอียดงานเพิ่มเติมครับ', time: '09:44' },
    ],
  },
  {
    id: 'c2',
    name: 'อารีย์ ผู้ช่วยร้าน',
    lastMessage: 'พรุ่งนี้สะดวกสัมภาษณ์ไหมคะ',
    messages: [
      { id: 'm1', sender: 'me', text: 'พร้อมเริ่มงานสัปดาห์หน้าไหมครับ', time: '12:01' },
      { id: 'm2', sender: 'them', text: 'ได้ค่ะ พรุ่งนี้สะดวกสัมภาษณ์ไหมคะ', time: '12:05' },
    ],
  },
  {
    id: 'c3',
    name: 'Thanakorn',
    lastMessage: 'ขอบคุณครับ',
    messages: [
      { id: 'm1', sender: 'them', text: 'อัตราค่าจ้างเท่าไหร่ครับ', time: '08:15' },
      { id: 'm2', sender: 'me', text: 'เริ่มต้นที่ 60 บาท/ชม. ครับ', time: '08:16' },
      { id: 'm3', sender: 'them', text: 'ขอบคุณครับ', time: '08:18' },
    ],
  },
];

const ChatPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations);
  const [activeId, setActiveId] = useState<string>(conversations[0]?.id ?? '');
  const [message, setMessage] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const active = useMemo(
    () => conversations.find((c) => c.id === activeId),
    [conversations, activeId]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
    );
  }, [conversations, query]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId, active?.messages.length]);

  const sendMessage = () => {
    const text = message.trim();
    if (!text || !active) return;
    const newMsg: Message = {
      id: 'm' + Math.random().toString(36).slice(2),
      sender: 'me',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              lastMessage: text,
              messages: [...c.messages, newMsg],
            }
          : c
      )
    );
    setMessage('');
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pt-4 pb-28">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-black">
          <MessageCircle size={22} />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight">แชท</h1>
          <p className="text-xs text-muted-foreground">ติดต่อผู้สมัครและพนักงานได้อย่างรวดเร็ว</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Conversation list */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">ข้อความ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="ค้นหาแชท..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <ScrollArea className="h-[56vh] md:h-[64vh]">
              <div className="divide-y">
                {filtered.map((c) => {
                  const isActive = c.id === activeId;
                  return (
                    <button
                      key={c.id}
                      className={`flex w-full items-center gap-3 px-2 py-3 text-left transition-colors ${
                        isActive ? 'bg-muted/60' : 'hover:bg-muted/40'
                      } rounded-md`}
                      onClick={() => setActiveId(c.id)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={c.avatar} alt={c.name} />
                        <AvatarFallback className="font-semibold">
                          {c.name
                            .split(' ')
                            .map((p) => p[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="truncate text-sm font-semibold">{c.name}</span>
                          {!!c.unread && (
                            <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">
                              {c.unread}
                            </span>
                          )}
                        </div>
                        <p className="truncate text-xs text-muted-foreground">{c.lastMessage}</p>
                      </div>
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="py-10 text-center text-sm text-muted-foreground">
                    ไม่พบแชทที่ตรงกับคำค้นหา
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat area */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={active?.avatar} alt={active?.name} />
                <AvatarFallback className="font-semibold">
                  {active?.name
                    ?.split(' ')
                    .map((p) => p[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-semibold leading-tight">
                  {active?.name ?? 'เลือกแชทจากรายการ'}
                </div>
                <div className="text-xs text-muted-foreground">พร้อมสนทนา</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Phone size={16} />
              โทรหา
            </Button>
          </CardHeader>

          <CardContent className="flex h-[48vh] flex-col md:h-[60vh]">
            <ScrollArea className="flex-1 rounded-md bg-muted/30 p-3">
              <div className="space-y-3">
                {active?.messages.map((m) => {
                  const align = m.sender === 'me' ? 'justify-end' : 'justify-start';
                  const bubble =
                    m.sender === 'me'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white text-foreground border';

                  return (
                    <div key={m.id} className={`flex ${align}`}>
                      <div
                        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${bubble}`}
                      >
                        <p>{m.text}</p>
                        <div className="mt-1 text-[10px] opacity-75">{m.time}</div>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>

            <div className="mt-3 flex items-center gap-2">
              <Input
                placeholder="พิมพ์ข้อความ..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <Button onClick={sendMessage} className="gap-2">
                <Send size={16} />
                ส่ง
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;