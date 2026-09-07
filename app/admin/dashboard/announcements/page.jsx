'use client';
import { useState, useEffect } from 'react';

export default function ManageAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const fetchAnnouncements = async () => {
    const res = await fetch('/api/announcements');
    if (res.ok) setAnnouncements(await res.json());
  };

  useEffect(() => { fetchAnnouncements(); }, []);

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDetails(item.details);
    setDate(new Date(item.announcement_date).toISOString().split('T')[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this announcement?')) return;
    const res = await fetch(`/api/announcements?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMessage('Announcement deleted.');
      fetchAnnouncements();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const payload = { title, details, date };
    if (editingId) payload.id = editingId;
    
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch('/api/announcements', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setMessage(editingId ? 'Updated successfully!' : 'Added successfully!');
      setTitle(''); setDetails(''); setDate(''); setEditingId(null);
      fetchAnnouncements();
    } else {
      setMessage('An error occurred.');
    }
    setIsSubmitting(false);
  };

  const cancelEdit = () => {
    setEditingId(null); setTitle(''); setDetails(''); setDate('');
  };

  return (
    <div>
      <h1 className="text-3xl font-serif text-gray-900 mb-8">Manage Announcements</h1>
      
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-2xl mb-12">
        <h2 className="text-lg font-bold tracking-widest text-gray-400 uppercase mb-6">
          {editingId ? 'Edit Announcement' : 'Add New Announcement'}
        </h2>
        {message && <div className="mb-6 p-4 bg-gray-50 text-gray-900 text-sm rounded-lg border">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-gray-900" required />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Details</label>
            <textarea rows="3" value={details} onChange={(e) => setDetails(e.target.value)} className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-gray-900 resize-none" required></textarea>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Announcement Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-gray-300 rounded-lg p-3 text-gray-900 w-full md:w-1/2 focus:outline-none focus:border-gray-900" required />
          </div>
          
          <div className="flex gap-4">
            <button type="submit" disabled={isSubmitting} className="bg-gray-900 text-white font-bold uppercase py-4 px-8 rounded-full hover:bg-black w-full">
              {isSubmitting ? 'Saving...' : (editingId ? 'Update' : 'Publish')}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="bg-gray-200 text-gray-900 font-bold uppercase py-4 px-8 rounded-full hover:bg-gray-300">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <h2 className="text-2xl font-serif text-gray-900 mb-6">Current Announcements</h2>
      <div className="grid grid-cols-1 gap-4">
        {announcements.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                {new Date(item.announcement_date).toLocaleDateString()}
              </p>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-1">{item.details}</p>
            </div>
            <div className="flex gap-4 shrink-0">
              <button onClick={() => handleEdit(item)} className="text-blue-600 font-semibold text-sm hover:underline">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 font-semibold text-sm hover:underline">Delete</button>
            </div>
          </div>
        ))}
        {announcements.length === 0 && <p className="text-gray-500">No announcements found.</p>}
      </div>
    </div>
  );
}