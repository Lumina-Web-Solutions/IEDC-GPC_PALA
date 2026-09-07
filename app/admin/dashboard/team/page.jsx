'use client';
import { useState, useEffect } from 'react';

export default function ManageTeam() {
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [category, setCategory] = useState('Student');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const fetchTeam = async () => {
    const res = await fetch('/api/team');
    if (res.ok) setMembers(await res.json());
  };

  useEffect(() => { fetchTeam(); }, []);

  const handleEdit = (member) => {
    setEditingId(member.id);
    setName(member.name);
    setRole(member.role);
    setCategory(member.category);
    setExistingImage(member.image_url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this team member?')) return;
    const res = await fetch(`/api/team?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMessage('Member deleted.');
      fetchTeam();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    formData.append('category', category);
    if (image) formData.append('image', image);
    else if (existingImage) formData.append('existingImage', existingImage);

    if (editingId) formData.append('id', editingId);
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch('/api/team', { method, body: formData });
    if (res.ok) {
      setMessage(editingId ? 'Updated successfully!' : 'Added successfully!');
      setName(''); setRole(''); setImage(null); setExistingImage(null); setEditingId(null);
      fetchTeam();
    }
    setIsSubmitting(false);
  };

  const cancelEdit = () => {
    setEditingId(null); setName(''); setRole(''); setImage(null); setExistingImage(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-serif text-gray-900 mb-8">Manage Team & Faculty</h1>
      
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-2xl mb-12">
        <h2 className="text-lg font-bold tracking-widest text-gray-400 uppercase mb-6">
          {editingId ? 'Edit Member' : 'Add New Member'}
        </h2>
        {message && <div className="mb-6 p-4 bg-gray-50 text-gray-900 text-sm rounded-lg border">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 rounded-lg p-3 text-gray-900" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Role</label>
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="border border-gray-300 rounded-lg p-3 text-gray-900" required />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-300 rounded-lg p-3 text-gray-900 bg-white">
                <option value="Faculty">Faculty / Mentor</option>
                <option value="Student">Student Execom</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Photo {existingImage && '(Leave blank to keep current)'}</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="border border-gray-300 rounded-lg p-2 text-gray-900" />
          </div>
          <div className="flex gap-4">
            <button type="submit" disabled={isSubmitting} className="bg-gray-900 text-white font-bold uppercase py-4 px-8 rounded-full hover:bg-black w-full">
              {isSubmitting ? 'Saving...' : (editingId ? 'Update Member' : 'Add Member')}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="bg-gray-200 text-gray-900 font-bold uppercase py-4 px-8 rounded-full hover:bg-gray-300">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <h2 className="text-2xl font-serif text-gray-900 mb-6">Current Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role} • {member.category}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(member)} className="text-blue-600 font-semibold text-sm hover:underline">Edit</button>
              <button onClick={() => handleDelete(member.id)} className="text-red-600 font-semibold text-sm hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}