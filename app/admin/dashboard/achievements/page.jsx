'use client';
import { useState, useEffect } from 'react';

export default function ManageAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const fetchAchievements = async () => {
    const res = await fetch('/api/achievements');
    if (res.ok) setAchievements(await res.json());
  };

  useEffect(() => { fetchAchievements(); }, []);

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setExistingImage(item.image_url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this achievement?')) return;
    const res = await fetch(`/api/achievements?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMessage('Deleted successfully.');
      fetchAchievements();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) formData.append('image', image);
    else if (existingImage) formData.append('existingImage', existingImage);

    if (editingId) formData.append('id', editingId);
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch('/api/achievements', { method, body: formData });
    if (res.ok) {
      setMessage(editingId ? 'Updated!' : 'Added!');
      setTitle(''); setDescription(''); setImage(null); setExistingImage(null); setEditingId(null);
      fetchAchievements();
    }
    setIsSubmitting(false);
  };

  const cancelEdit = () => {
    setEditingId(null); setTitle(''); setDescription(''); setImage(null); setExistingImage(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-serif text-gray-900 mb-8">Manage Achievements</h1>
      
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-2xl mb-12">
        <h2 className="text-lg font-bold tracking-widest text-gray-400 uppercase mb-6">
          {editingId ? 'Edit Achievement' : 'Add New Achievement'}
        </h2>
        {message && <div className="mb-6 p-4 bg-gray-50 text-gray-900 text-sm rounded-lg border">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-gray-900" required />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-gray-900 resize-none" required></textarea>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Image {existingImage && '(Leave blank to keep current)'}</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="border border-gray-300 rounded-lg p-2 text-gray-900" />
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

      <h2 className="text-2xl font-serif text-gray-900 mb-6">Current Achievements</h2>
      <div className="grid grid-cols-1 gap-4">
        {achievements.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => handleEdit(item)} className="text-blue-600 font-semibold text-sm hover:underline">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 font-semibold text-sm hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}