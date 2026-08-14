'use client';

import React, { useState } from 'react';

const mockChats = [
    { id: 1, name: 'Marco (Owner)', lastMsg: 'The car is ready for you!', time: '10:45 AM', active: true, avatar: 'https://i.pravatar.cc/150?u=marco' },
    { id: 2, name: 'Elena (Yacht Concierge)', lastMsg: 'Shall I prepare the drinks?', time: 'Yesterday', active: false, avatar: 'https://i.pravatar.cc/150?u=elena' },
    { id: 3, name: 'Dubai Rentals', lastMsg: 'Your booking is confirmed.', time: 'Monday', active: false, avatar: 'https://i.pravatar.cc/150?u=dubai' }
];

const mockMessages = [
    { id: 1, sender: 'other', text: 'Hello! I am ready to hand over the keys for the Audi RS6.', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Great! I am 10 minutes away from the location.', time: '10:32 AM' },
    { id: 3, sender: 'other', text: 'Perfect. I am parked near the main entrance of the Marina.', time: '10:40 AM' },
    { id: 4, sender: 'other', text: 'The car is ready for you!', time: '10:45 AM' }
];

export default function ChatPage() {
    const [msg, setMsg] = useState('');

    return (
        <div className="chat-layout">
            <div className="container chat-container">
                <div className="chat-sidebar">
                    <div className="sidebar-header">
                        <h2>Messages</h2>
                    </div>
                    <div className="chat-list">
                        {mockChats.map(chat => (
                            <div key={chat.id} className={`chat-item ${chat.active ? 'active' : ''}`}>
                                <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
                                <div className="chat-meta">
                                    <div className="chat-name-row">
                                        <span className="chat-name">{chat.name}</span>
                                        <span className="chat-time">{chat.time}</span>
                                    </div>
                                    <p className="chat-preview">{chat.lastMsg}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chat-window">
                    <div className="chat-header">
                        <div className="chat-header-info">
                            <img src={mockChats[0].avatar} alt={mockChats[0].name} className="chat-avatar" />
                            <div>
                                <h3>{mockChats[0].name}</h3>
                                <span className="online-status">Online</span>
                            </div>
                        </div>
                        <div className="chat-header-actions">
                            <button className="icon-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg></button>
                            <button className="icon-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"></path></svg></button>
                        </div>
                    </div>

                    <div className="message-history">
                        {mockMessages.map(m => (
                            <div key={m.id} className={`message-row ${m.sender === 'me' ? 'me' : 'other'}`}>
                                <div className="message-bubble">
                                    <p>{m.text}</p>
                                    <span className="msg-time">{m.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="chat-input-area">
                        <div className="input-box">
                            <button className="attach-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></button>
                            <input 
                                type="text" 
                                placeholder="Type a message..." 
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                            />
                            <button className="send-btn" disabled={!msg.trim()}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .chat-layout {
                    height: calc(100vh - 80px);
                    background: #F4F5F7;
                    padding-top: 85px; /* Offset for fixed header */
                    padding-bottom: 20px;
                }
                .chat-container {
                    display: grid;
                    grid-template-columns: 350px 1fr;
                    background: white;
                    height: 100%;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 15px 50px rgba(0,0,0,0.05);
                }
                
                /* Sidebar */
                .chat-sidebar {
                    border-right: 1px solid #F0F2F5;
                    display: flex;
                    flex-direction: column;
                }
                .sidebar-header {
                    padding: 25px;
                    border-bottom: 1px solid #F0F2F5;
                }
                .sidebar-header h2 { font-size: 1.25rem; font-weight: 800; color: var(--text-primary); }
                .chat-list { flex: 1; overflow-y: auto; }
                .chat-item {
                    padding: 20px 25px;
                    display: flex;
                    gap: 15px;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .chat-item:hover { background: #F8F9FA; }
                .chat-item.active { background: #F0F7FF; border-left: 4px solid var(--accent-blue); }
                .chat-avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; }
                .chat-meta { flex: 1; min-width: 0; }
                .chat-name-row { display: flex; justify-content: space-between; margin-bottom: 4px; }
                .chat-name { font-weight: 700; color: var(--text-primary); font-size: 0.95rem; }
                .chat-time { font-size: 0.8rem; color: #8C929A; }
                .chat-preview { font-size: 0.85rem; color: #6B7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

                /* Chat Window */
                .chat-window { display: flex; flex-direction: column; background: #fff; }
                .chat-header {
                    padding: 15px 25px;
                    border-bottom: 1px solid #F0F2F5;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .chat-header-info { display: flex; gap: 12px; align-items: center; }
                .chat-header-info h3 { font-size: 1rem; font-weight: 700; color: var(--text-primary); }
                .online-status { font-size: 0.8rem; color: #00B67A; font-weight: 600; display: block; }
                .chat-header-actions { display: flex; gap: 10px; }
                .icon-btn { width: 40px; height: 40px; border-radius: 50%; border: none; background: transparent; color: #6B7280; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; }
                .icon-btn:hover { background: #F3F4F6; color: var(--text-primary); }
                .icon-btn svg { width: 20px; height: 20px; }

                .message-history {
                    flex: 1;
                    padding: 30px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    background: #fdfdfd;
                }
                .message-row { display: flex; width: 100%; }
                .message-row.me { justify-content: flex-end; }
                .message-row.other { justify-content: flex-start; }
                .message-bubble {
                    max-width: 70%;
                    padding: 12px 18px;
                    border-radius: 18px;
                    position: relative;
                }
                .me .message-bubble { background: var(--accent-blue); color: white; border-bottom-right-radius: 4px; }
                .other .message-bubble { background: #F3F4F6; color: var(--text-primary); border-bottom-left-radius: 4px; }
                .message-bubble p { font-size: 0.95rem; line-height: 1.5; margin: 0; }
                .msg-time { font-size: 0.7rem; opacity: 0.7; margin-top: 5px; display: block; text-align: right; }

                .chat-input-area { padding: 25px; border-top: 1px solid #F0F2F5; }
                .input-box {
                    background: #F8F9FA;
                    border-radius: 12px;
                    padding: 8px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border: 1px solid #EAECF0;
                }
                .input-box input {
                    flex: 1;
                    border: none;
                    background: transparent;
                    padding: 10px;
                    font-family: inherit;
                    font-size: 0.95rem;
                    outline: none;
                }
                .attach-btn, .send-btn {
                    width: 40px; height: 40px;
                    border: none;
                    background: transparent;
                    color: #6B7280;
                    cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    border-radius: 8px;
                }
                .send-btn { background: var(--accent-blue); color: white; }
                .send-btn:disabled { opacity: 0.5; background: #EAECF0; color: #8C929A; cursor: not-allowed; }
                .send-btn svg { width: 18px; height: 18px; }

                @media (max-width: 800px) {
                    .chat-sidebar { display: none; }
                    .chat-container { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}
