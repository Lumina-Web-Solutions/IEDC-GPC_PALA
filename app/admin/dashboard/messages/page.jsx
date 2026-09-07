'use client';
import { useState, useEffect } from 'react';

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const res = await fetch('/api/contact');
    if (res.ok) setMessages(await res.json());
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchMessages();
  };

  return (
    <div>
      <h1 className="text-3xl font-serif text-gray-900 mb-8">Inbox</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm relative">
            <button 
              onClick={() => handleDelete(msg.id)}
              className="absolute top-6 right-6 text-red-500 font-bold hover:underline text-sm"
            >
              Delete
            </button>
            <h3 className="font-bold text-gray-900 text-lg">{msg.name}</h3>
            <p className="text-sm font-semibold text-blue-600 mb-4">{msg.email}</p>
            <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
            <p className="text-xs text-gray-400 mt-6 tracking-wider uppercase">
              {new Date(msg.created_at).toLocaleString()}
            </p>
          </div>
        ))}
        {messages.length === 0 && <p className="text-gray-500">Your inbox is empty.</p>}
      </div>
    </div>
  );
}