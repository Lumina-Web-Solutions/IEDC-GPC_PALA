'use client';
import { useState, useEffect } from 'react';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null); // Tracks if we are editing
  const [existingImage, setExistingImage] = useState(null);

  // Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [links, setLinks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch existing events on load
  const fetchEvents = async () => {
    const res = await fetch('/api/events');
    if (res.ok) {
      const data = await res.json();
      setEvents(data);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addLink = () => setLinks([...links, { label: '', url: '' }]);
  const updateLink = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };
  const removeLink = (index) => setLinks(links.filter((_, i) => i !== index));

  // Load event data into the form for editing
  const handleEdit = (event) => {
    setEditingId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    // Format date for the input field (YYYY-MM-DD)
    setDate(new Date(event.event_date).toISOString().split('T')[0]);
    setLinks(event.links || []);
    setExistingImage(event.image_url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!confirm('WARNING: Are you sure you want to permanently delete this event record? This action cannot be undone.')) return;
    
    try {
      const res = await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('SUCCESS: Event record deleted.');
        fetchEvents(); // Refresh list
      }
    } catch (error) {
      setMessage('ERROR: Failed to delete event record.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('links', JSON.stringify(links));
    
    if (image) {
      formData.append('image', image);
    } else if (existingImage) {
      formData.append('existingImage', existingImage);
    }

    // If editingId exists, send PUT. Otherwise, send POST.
    if (editingId) formData.append('id', editingId);
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/events', { method, body: formData });
      if (res.ok) {
        setMessage(editingId ? 'SUCCESS: Event record updated successfully.' : 'SUCCESS: New event record published successfully.');
        setTitle(''); setDescription(''); setDate(''); setImage(null); setLinks([]);
        setEditingId(null); setExistingImage(null);
        fetchEvents(); // Refresh list
      }
    } catch (error) {
      setMessage('ERROR: An unexpected system error occurred.');
    }
    setIsSubmitting(false);
  };

  // Cancel editing mode
  const cancelEdit = () => {
    setEditingId(null);
    setTitle(''); setDescription(''); setDate(''); setImage(null); setLinks([]); setExistingImage(null);
  };

  return (
    <div className="w-full text-[#333333] font-sans pb-10">
      
      {/* Official Page Header */}
      <div className="border-b-2 border-[#003366] pb-2 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#003366] uppercase m-0 tracking-wide">
          Events Management Module
        </h1>
        <p className="text-xs text-[#555555] font-bold uppercase mt-1">IEDC Portal • Official Records</p>
      </div>
      
      {/* Event Entry Form */}
      <div className="border border-[#CCCCCC] bg-white mb-10 shadow-sm relative">
        <div className="bg-[#003366] text-white px-5 py-3 text-sm font-bold uppercase tracking-wider flex justify-between items-center border-b-4 border-orange-500">
          <span>{editingId ? 'EDIT EVENT RECORD' : 'REGISTER NEW EVENT'}</span>
          {editingId && (
            <span className="bg-orange-500 text-white px-2 py-0.5 text-[10px] rounded-sm animate-pulse">
              EDIT MODE ACTIVE
            </span>
          )}
        </div>
        
        <div className="p-5 md:p-8">
          {message && (
            <div className={`mb-6 p-3 text-xs font-bold uppercase tracking-wide border ${message.includes('ERROR') ? 'bg-[#FFEEEE] border-[#CC0000] text-[#CC0000]' : 'bg-[#E5F6E5] border-[#008000] text-[#006600]'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-[#333333] uppercase mb-1.5">Event Title <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full border border-[#CCCCCC] bg-[#F8F9FA] px-3 py-2.5 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#003366] focus:ring-1 focus:ring-[#003366] transition-none" 
                required 
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-[#333333] uppercase mb-1.5">Official Description <span className="text-red-500">*</span></label>
              <textarea 
                rows="4" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="w-full border border-[#CCCCCC] bg-[#F8F9FA] px-3 py-2.5 text-sm font-medium focus:outline-none focus:bg-white focus:border-[#003366] focus:ring-1 focus:ring-[#003366] resize-y transition-none leading-relaxed" 
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-[#333333] uppercase mb-1.5">Date of Event <span className="text-red-500">*</span></label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  className="w-full border border-[#CCCCCC] bg-[#F8F9FA] px-3 py-2.5 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#003366] focus:ring-1 focus:ring-[#003366] transition-none" 
                  required 
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-[#333333] uppercase mb-1.5">Cover Image Asset {existingImage && <span className="text-[#003366]">(Optional - Keeps Existing)</span>}</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setImage(e.target.files[0])} 
                  className="w-full border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#003366] file:mr-4 file:py-1 file:px-3 file:border-0 file:text-xs file:font-bold file:bg-[#E5E7EB] file:text-[#333333] hover:file:bg-[#CCCCCC] transition-none" 
                />
              </div>
            </div>

            <div className="pt-6 border-t border-[#CCCCCC]">
              <div className="flex justify-between items-center mb-4">
                <label className="text-xs font-bold text-[#333333] uppercase">Action Links & References</label>
                <button 
                  type="button" 
                  onClick={addLink} 
                  className="text-xs font-bold text-[#003366] bg-[#E5E7EB] hover:bg-[#CCCCCC] px-3 py-1.5 border border-[#BBBBBB] transition-none"
                >
                  + ADD LINK
                </button>
              </div>
              
              {links.map((link, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-3 mb-4 items-start md:items-center bg-[#F8F9FA] p-3 border border-[#E5E7EB]">
                  <input 
                    type="text" 
                    placeholder="Link Label (e.g., Register Now)" 
                    value={link.label} 
                    onChange={(e) => updateLink(index, 'label', e.target.value)} 
                    className="w-full md:w-1/3 border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#003366]" 
                    required 
                  />
                  <input 
                    type="url" 
                    placeholder="https://..." 
                    value={link.url} 
                    onChange={(e) => updateLink(index, 'url', e.target.value)} 
                    className="w-full md:w-2/3 border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#003366]" 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => removeLink(index)} 
                    className="text-[#CC0000] font-bold text-sm bg-white border border-[#CC0000] px-3 py-1.5 hover:bg-[#FFEEEE]"
                    title="Remove Link"
                  >
                    REMOVE
                  </button>
                </div>
              ))}
              {links.length === 0 && <p className="text-xs text-[#777777] italic">No links added. Click "+ Add Link" to append registration or reference URLs.</p>}
            </div>

            <div className="flex flex-col md:flex-row gap-3 pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="bg-[#003366] text-white font-bold text-sm tracking-wider uppercase px-6 py-3 border border-[#002244] hover:bg-orange-500 hover:border-orange-600 disabled:opacity-70 disabled:cursor-not-allowed transition-none shadow-sm"
              >
                {isSubmitting ? 'PROCESSING...' : (editingId ? 'UPDATE RECORD' : 'PUBLISH EVENT')}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={cancelEdit} 
                  className="bg-[#E5E7EB] text-[#333333] font-bold text-sm tracking-wider uppercase px-6 py-3 border border-[#CCCCCC] hover:bg-[#CCCCCC] transition-none"
                >
                  CANCEL EDIT
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Directory Table for Existing Events */}
      <div className="border border-[#CCCCCC] shadow-sm overflow-x-auto bg-white">
        <div className="bg-[#E5E7EB] border-b border-[#CCCCCC] px-4 py-3 text-sm font-bold text-[#003366] uppercase flex justify-between items-center">
          <span>Registered Events Directory</span>
          <span className="text-xs bg-white border border-[#CCCCCC] px-2 py-0.5 text-[#555555]">Total: {events.length}</span>
        </div>
        
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-[#F8F9FA] border-b-2 border-[#CCCCCC]">
            <tr>
              <th className="p-3 text-xs font-bold text-[#555555] border-r border-[#CCCCCC] w-12 text-center">S.NO.</th>
              <th className="p-3 text-xs font-bold text-[#555555] border-r border-[#CCCCCC]">EVENT TITLE & DETAILS</th>
              <th className="p-3 text-xs font-bold text-[#555555] border-r border-[#CCCCCC] w-32">DATE</th>
              <th className="p-3 text-xs font-bold text-[#555555] w-48 text-center">ADMIN ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#CCCCCC]">
            {events.length > 0 ? (
              events.map((event, index) => (
                <tr key={event.id} className="hover:bg-[#F0F5FA] transition-none">
                  <td className="p-3 text-xs font-bold text-[#777777] border-r border-[#CCCCCC] text-center align-top">
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="p-3 border-r border-[#CCCCCC] align-top">
                    <div className="font-bold text-sm text-[#003366] mb-1">{event.title}</div>
                    <div className="text-xs text-[#555555] truncate max-w-sm md:max-w-md">{event.description}</div>
                  </td>
                  <td className="p-3 text-xs font-bold text-[#333333] border-r border-[#CCCCCC] align-top">
                    {new Date(event.event_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
                  </td>
                  <td className="p-3 text-center align-top">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(event)} 
                        className="bg-[#E5E7EB] text-[#003366] text-[10px] font-bold uppercase px-3 py-1.5 border border-[#CCCCCC] hover:bg-[#003366] hover:text-white transition-colors"
                      >
                        MODIFY
                      </button>
                      <button 
                        onClick={() => handleDelete(event.id)} 
                        className="bg-white text-[#CC0000] text-[10px] font-bold uppercase px-3 py-1.5 border border-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-colors"
                      >
                        REVOKE
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-6 text-center text-sm text-[#777777] italic bg-[#F8F9FA]">
                  No event records found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
