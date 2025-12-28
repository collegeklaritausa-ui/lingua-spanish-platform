import { useLanguage } from "@/contexts/LanguageContext";
import { AvatarHost } from "@/components/AvatarHost";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Loader2, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FeedItem } from "@/const/feedData";

interface ChatMessage {
  id: number;
  sender: 'user' | 'host';
  text: string;
}

const CEFR_LEVELS: FeedItem['cefrLevel'][] = ['A1', 'A2', 'B1', 'B2', 'C1'];

export default function ChatArena() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [hostState, setHostState] = useState<'idle' | 'listening' | 'speaking'>('idle');
  const [cefrLevel, setCefrLevel] = useState<FeedItem['cefrLevel']>('A1');
  const scrollRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.chat.interact.useMutation({
    onMutate: () => {
      setHostState('listening');
    },
    onSuccess: (data) => {
      setHostState('speaking');
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'host', text: data.response },
      ]);
      // Host returns to idle after speaking
      setTimeout(() => setHostState('idle'), 3000);
    },
    onError: (error) => {
      setHostState('idle');
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'host', text: t('chat.error_message') + `: ${error.message}` },
      ]);
    },
  });

  // Initial welcome message
  useEffect(() => {
    setMessages([
      { id: 0, sender: 'host', text: t('host.default_message') },
    ]);
  }, [t]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || chatMutation.isPending) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    chatMutation.mutate({
      message: userMessage.text,
      language: language,
      cefrLevel: cefrLevel,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-10 w-full bg-card/90 backdrop-blur-sm border-b border-border p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">{t('app.title')} - {t('chat.arena_title')}</h1>
        <div className="flex items-center space-x-4">
          <Select value={cefrLevel} onValueChange={(value) => setCefrLevel(value as FeedItem['cefrLevel'])}>
            <SelectTrigger className="w-[120px] bg-secondary text-secondary-foreground border-primary">
              <SelectValue placeholder="CEFR Level" />
            </SelectTrigger>
            <SelectContent className="bg-card border-primary">
              {CEFR_LEVELS.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* LanguageSelector will be here in the main app layout */}
        </div>
      </header>

      <main className="flex-grow flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Avatar Host Section */}
        <Card className="w-full lg:w-1/3 bg-card border-primary/50 shadow-2xl shadow-primary/10">
          <CardHeader>
            <CardTitle className="text-center text-secondary">{t('chat.host_title')}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <AvatarHost message={messages.length > 0 ? messages[messages.length - 1].text : t('host.default_message')} state={hostState} />
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            Host State: <span className="capitalize ml-1 text-primary">{hostState}</span>
          </CardFooter>
        </Card>

        {/* Chat Window Section */}
        <Card className="w-full lg:w-2/3 flex flex-col bg-card border-secondary/50 shadow-2xl shadow-secondary/10">
          <CardHeader>
            <CardTitle className="text-secondary">{t('chat.conversation_title')}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-0">
            <div ref={scrollRef} className="h-[60vh] p-4 overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatMutation.isPending && (
                <div className="flex justify-start mb-4">
                  <div className="max-w-[70%] p-3 rounded-lg bg-secondary text-secondary-foreground flex items-center">
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                    {t('chat.host_typing')}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t border-border">
            <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
              <Input
                type="text"
                placeholder={t('chat.input_placeholder')}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={chatMutation.isPending}
                className="flex-grow bg-input border-primary/50 text-foreground focus:ring-primary"
              />
              <Button type="submit" disabled={chatMutation.isPending || !inputMessage.trim()} className="bg-primary hover:bg-primary/90">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
