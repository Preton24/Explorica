'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2, MessageSquare, Send, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sendMessageToTravelBuddyAction } from '@/lib/actions';

type Message = {
  role: 'user' | 'model';
  content: { text: string }[];
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: [{ text: input }],
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const response = await sendMessageToTravelBuddyAction({
        history: messages,
        message: input,
    });
    
    if ('error' in response) {
        const errorMessage: Message = {
            role: 'model',
            content: [{ text: response.error }],
        };
        setMessages(prev => [...prev, errorMessage]);
    } else {
         const aiMessage: Message = {
            role: 'model',
            content: [{ text: response.response }],
        };
        setMessages(prev => [...prev, aiMessage]);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <div className={cn("fixed bottom-8 right-8 z-50 transition-transform duration-300", isOpen ? "scale-0" : "scale-100")}>
        <Button onClick={toggleChat} size="lg" className="rounded-full h-16 w-16 shadow-2xl">
          <MessageSquare className="h-8 w-8" />
        </Button>
      </div>

      <div
        className={cn(
          'fixed bottom-8 right-8 z-50 w-full max-w-md transition-all duration-300 ease-in-out',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        )}
      >
        <Card className="flex flex-col h-[60vh] shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className='flex items-center gap-3'>
                 <div className="bg-primary/10 p-2 rounded-full">
                    <Bot className="h-6 w-6 text-primary" />
                 </div>
                 <div>
                    <CardTitle className="font-headline">Travel Buddy AI</CardTitle>
                    <CardDescription>Your personal travel assistant</CardDescription>
                 </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <ScrollArea className="h-full pr-4" ref={scrollAreaRef as any}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                     {message.role === 'model' && (
                       <div className="bg-muted p-2 rounded-full h-fit">
                          <Bot className="w-5 h-5 text-primary" />
                       </div>
                    )}
                    <div
                      className={cn(
                        'max-w-xs rounded-2xl p-3 text-sm',
                        message.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'
                      )}
                    >
                      {message.content[0].text}
                    </div>
                     {message.role === 'user' && (
                        <div className="bg-muted p-2 rounded-full h-fit">
                            <User className="w-5 h-5 text-foreground" />
                        </div>
                    )}
                  </div>
                ))}
                {loading && (
                    <div className="flex items-end gap-3 justify-start">
                        <div className="bg-muted p-2 rounded-full h-fit">
                           <Bot className="w-5 h-5 text-primary" />
                        </div>
                        <div className="max-w-xs rounded-2xl p-3 text-sm bg-muted rounded-bl-none">
                            <Loader2 className="w-5 h-5 animate-spin text-primary" />
                        </div>
                    </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask your travel buddy..."
                disabled={loading}
              />
              <Button type="submit" size="icon" disabled={loading}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
