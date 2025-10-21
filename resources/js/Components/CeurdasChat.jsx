import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { ScrollArea } from '@/Components/ui/scroll-area';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/Components/ui/sheet';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useForm } from '@inertiajs/react';
import { Bot, User } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

export default function CeurdasChat() {
    const { data, setData, post, processing, errors, reset } = useForm({
        message: '',
    });
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Assalamualaikum, na soalan?',
        },
    ]);

    const scrollAreaRef = useRef(null);

    const submit = (e) => {
        e.preventDefault();
        const userMessage = { role: 'user', content: data.message };
        setMessages((prev) => [...prev, userMessage]);
        post(route('chat.send'), {
            preserveScroll: true,
            onSuccess: (response) => {
                const assistantMessage = response.props.flash.chat;
                setMessages((prev) => [...prev, assistantMessage]);
                reset('message');
            },
        });
    };

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className='fixed bottom-4 right-4 z-50 h-16 w-16 rounded-full shadow-lg'>
                    <Bot className='h-8 w-8' />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>CeurdasChat</SheetTitle>
                    <SheetDescription>
                        Tanyakan apa saja seputar Gampong Udeung.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className='flex-grow pr-4 h-[calc(100%-120px)]'>
                    <div className='mt-4 space-y-4'>
                        {messages.map((m, index) => (
                            <div
                                key={index}
                                className={`flex items-start gap-3 ${
                                    m.role === 'user'
                                        ? 'justify-end'
                                        : 'justify-start'
                                }`}
                            >
                                {m.role === 'assistant' && (
                                    <Avatar className='h-8 w-8'>
                                        <AvatarFallback>
                                            <Bot />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={`rounded-lg px-4 py-2 ${
                                        m.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'
                                    }`}
                                >
                                    <p className='text-sm'>{m.content}</p>
                                </div>
                                {m.role === 'user' && (
                                    <Avatar className='h-8 w-8'>
                                        <AvatarFallback>
                                            <User />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <form
                    className='absolute bottom-4 left-4 right-4'
                    onSubmit={submit}
                >
                    <div className='relative'>
                        <Input
                            placeholder='Ketik pesan...'
                            className='pr-12'
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            disabled={processing}
                        />
                        <Button
                            type='submit'
                            size='icon'
                            className='absolute right-2 top-1/2 -translate-y-1/2'
                            disabled={processing}
                        >
                            <PaperAirplaneIcon className='h-5 w-5' />
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}