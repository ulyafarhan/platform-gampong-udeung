import { useState, useRef, useEffect } from 'react';
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Bot, Send, X, User, Loader2 } from 'lucide-react';
import axios from 'axios';

const CeurdasChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Assalamu'alaikum! Saya Ceurdas, asisten digital Gampong Udeung. Ada yang bisa saya bantu?",
            sender: 'bot',
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: input,
            sender: 'user',
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const { data } = await axios.post(route('chat.send'), {
                question: userMessage.text,
                history: messages 
            });

            if (!data) {
                throw new Error('No data received from server');
            }

            const botMessage = {
                id: Date.now() + 1,
                text: data.answer,
                sender: 'bot',
            };

            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error("Error fetching chat response:", error);
            const errorMessage = {
                id: Date.now() + 1,
                text: "Maaf, terjadi kesalahan saat mencoba menghubungi server. Silakan coba lagi nanti.",
                sender: 'bot',
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className={`fixed bottom-4 right-4 z-[1000] transition-all duration-300 ease-in-out`}>
            {/* Chat Bubble Toggle */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-full w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 text-white shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                >
                    <Bot className="h-8 w-8" />
                </Button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <Card className="w-80 md:w-96 h-[60vh] md:h-[70vh] bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl flex flex-col animate-fade-in">
                    <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border-2 border-green-500">
                                <AvatarImage src="/img/ceurdas-logo.png" alt="Ceurdas AI" />
                                <AvatarFallback className="bg-green-500 text-white">AI</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Ceurdas AI</h3>
                                <p className="text-xs text-green-600 dark:text-green-400 font-semibold">Online</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                            <X className="h-5 w-5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 p-0">
                        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                            <div className="space-y-6">
                                {messages.map((message) => (
                                    <div key={message.id} className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {message.sender === 'bot' && (
                                            <Avatar className="w-8 h-8 flex-shrink-0">
                                                <AvatarImage src="/img/ceurdas-logo.png" alt="Ceurdas AI" />
                                                <AvatarFallback className="bg-green-500 text-white">AI</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={`max-w-[80%] p-3 rounded-2xl ${message.sender === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'}`}>
                                            <p className="text-sm leading-relaxed">{message.text}</p>
                                        </div>
                                        {message.sender === 'user' && (
                                            <Avatar className="w-8 h-8 flex-shrink-0">
                                                <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200"><User className="w-4 h-4" /></AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex items-end gap-2 justify-start">
                                        <Avatar className="w-8 h-8 flex-shrink-0">
                                            <AvatarImage src="/img/ceurdas-logo.png" alt="Ceurdas AI" />
                                            <AvatarFallback className="bg-green-500 text-white">AI</AvatarFallback>
                                        </Avatar>
                                        <div className="max-w-[80%] p-3 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none flex items-center">
                                            <Loader2 className="h-5 w-5 animate-spin text-green-500" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <form onSubmit={handleSubmit} className="flex items-center w-full gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ketik pesan Anda..."
                                className="flex-1 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-green-500"
                                disabled={isLoading}
                            />
                            <Button type="submit" size="icon" className="rounded-full bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
                                <Send className="h-5 w-5" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
};

export default CeurdasChat;