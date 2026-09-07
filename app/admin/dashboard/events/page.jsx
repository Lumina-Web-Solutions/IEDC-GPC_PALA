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
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const res = await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('Event deleted.');
        fetchEvents(); // Refresh list
      }
    } catch (error) {
      setMessage('Error deleting event.');
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
        setMessage(editingId ? 'Event updated successfully!' : 'Event added successfully!');
        setTitle(''); setDescription(''); setDate(''); setImage(null); setLinks([]);
        setEditingId(null); setExistingImage(null);
        fetchEvents(); // Refresh list
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
    setIsSubmitting(false);
  };

  // Cancel editing mode
  const cancelEdit = () => {
    setEditingId(null);
    setTitle(''); setDescription(''); setDate(''); setImage(null); setLinks([]); setExistingImage(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-serif text-gray-900 mb-8">Manage Events</h1>
      
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-3xl mb-12">
        <h2 className="text-lg font-bold tracking-widest text-gray-400 uppercase mb-6">
          {editingId ? 'Edit Event' : 'Add New Event'}
        </h2>
        
        {message && <div className="mb-6 p-4 bg-gray-50 text-gray-900 text-sm rounded-lg border border-gray-200">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Event Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-900 text-gray-900" required />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-900 text-gray-900 resize-none" required></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Event Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-gray-900 text-gray-900" required />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Cover Image {existingImage && '(Leave blank to keep existing)'}</label>
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-gray-900 text-gray-900" />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-semibold text-gray-700">Action Links</label>
              <button type="button" onClick={addLink} className="text-xs font-bold text-gray-900 bg-gray-100 px-4 py-2 rounded-full">
                + Add Link
              </button>
            </div>
            
            {links.map((link, index) => (
              <div key={index} className="flex gap-4 mb-4 items-center">
                <input type="text" placeholder="Label" value={link.label} onChange={(e) => updateLink(index, 'label', e.target.value)} className="border border-gray-300 rounded-lg p-3 w-1/3 text-sm text-gray-900" required />
                <input type="url" placeholder="URL" value={link.url} onChange={(e) => updateLink(index, 'url', e.target.value)} className="border border-gray-300 rounded-lg p-3 w-full text-sm text-gray-900" required />
                <button type="button" onClick={() => removeLink(index)} className="text-red-500 font-bold">✕</button>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button type="submit" disabled={isSubmitting} className="bg-gray-900 text-white font-bold tracking-widest uppercase py-4 px-8 rounded-full hover:bg-black transition-colors w-full mt-4">
              {isSubmitting ? 'Saving...' : (editingId ? 'Update Event' : 'Publish Event')}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="bg-gray-200 text-gray-900 font-bold tracking-widest uppercase py-4 px-8 rounded-full hover:bg-gray-300 transition-colors mt-4">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List of Existing Events */}
      <h2 className="text-2xl font-serif text-gray-900 mb-6">Current Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{event.title}</h3>
              <p className="text-sm text-gray-500">{new Date(event.event_date).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(event)} className="text-blue-600 font-semibold text-sm hover:underline">Edit</button>
              <button onClick={() => handleDelete(event.id)} className="text-red-600 font-semibold text-sm hover:underline">Delete</button>
            </div>
          </div>
        ))}
        {events.length === 0 && <p className="text-gray-500">No events found.</p>}
      </div>
    </div>
  );
}