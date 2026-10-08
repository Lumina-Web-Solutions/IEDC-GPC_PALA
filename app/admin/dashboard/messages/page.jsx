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
    if (!confirm('WARNING: Are you sure you want to permanently delete this communication record? This action cannot be undone.')) return;
    const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchMessages();
  };

  return (
    <div className="w-full text-[#333333] font-sans pb-10">
      
      {/* Official Page Header */}
      <div className="border-b-2 border-[#003366] pb-2 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#003366] uppercase m-0 tracking-wide">
          Public Communications Inbox
        </h1>
        <p className="text-xs text-[#555555] font-bold uppercase mt-1">IEDC Portal • Inbound Queries & Feedback</p>
      </div>
      
      {/* Messages Directory */}
      <div className="border border-[#CCCCCC] shadow-sm bg-white">
        <div className="bg-[#E5E7EB] border-b border-[#CCCCCC] px-4 py-3 text-sm font-bold text-[#003366] uppercase flex justify-between items-center">
          <span>Official Correspondence Log</span>
          <span className="text-xs bg-white border border-[#CCCCCC] px-2 py-0.5 text-[#555555]">Total Records: {messages.length}</span>
        </div>
        
        <div className="p-4 md:p-6 bg-[#F8F9FA] space-y-5">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={msg.id} className="bg-white border border-[#CCCCCC] shadow-sm relative flex flex-col">
                
                {/* Message Header (System Record Data) */}
                <div className="bg-[#E5E7EB] px-4 py-2 flex justify-between items-center border-b border-[#CCCCCC]">
                  <div className="text-[10px] font-bold text-[#555555] uppercase tracking-wider">
                    RECORD #{String(index + 1).padStart(4, '0')} &nbsp;|&nbsp; LOGGED: {new Date(msg.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).toUpperCase()}
                  </div>
                  <button 
                    onClick={() => handleDelete(msg.id)}
                    className="bg-white text-[#CC0000] text-[10px] font-bold uppercase px-3 py-1 border border-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-colors"
                    title="Permanently Delete Record"
                  >
                    DELETE RECORD
                  </button>
                </div>
                
                {/* Message Body Layout */}
                <div className="p-4 md:p-5 flex flex-col md:flex-row gap-6">
                  
                  {/* Sender Details Panel */}
                  <div className="md:w-1/3 flex flex-col gap-4 md:border-r border-[#CCCCCC] md:pr-6">
                    <div>
                      <p className="text-[10px] font-bold text-[#777777] uppercase tracking-wider mb-0.5">Sender Name</p>
                      <p className="text-sm font-bold text-[#003366] uppercase">{msg.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#777777] uppercase tracking-wider mb-0.5">Contact Email ID</p>
                      <p className="text-sm font-bold text-[#333333] break-all">
                        <a href={`mailto:${msg.email}`} className="text-[#003366] hover:text-orange-600 hover:underline">
                          {msg.email}
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  {/* Message Content Panel */}
                  <div className="md:w-2/3">
                    <p className="text-[10px] font-bold text-[#777777] uppercase tracking-wider mb-2">Communication Details / Message</p>
                    <div className="text-sm text-[#333333] whitespace-pre-wrap leading-relaxed bg-[#F8F9FA] p-4 border border-[#E5E7EB] min-h-[100px]">
                      {msg.message}
                    </div>
                  </div>
                  
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-white border border-[#CCCCCC]">
              <p className="text-sm text-[#777777] italic font-bold">No public communications logged in the database.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
