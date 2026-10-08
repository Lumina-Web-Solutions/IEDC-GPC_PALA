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
    if (!confirm('WARNING: Are you sure you want to permanently revoke this achievement record? This action cannot be undone.')) return;
    const res = await fetch(`/api/achievements?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMessage('SUCCESS: Achievement record revoked and deleted.');
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

    try {
      const res = await fetch('/api/achievements', { method, body: formData });
      if (res.ok) {
        setMessage(editingId ? 'SUCCESS: Achievement record modified.' : 'SUCCESS: New achievement officially registered.');
        setTitle(''); setDescription(''); setImage(null); setExistingImage(null); setEditingId(null);
        fetchAchievements();
      } else {
        setMessage('ERROR: Failed to process request.');
      }
    } catch (error) {
      setMessage('ERROR: System failure during transmission.');
    }
    setIsSubmitting(false);
  };

  const cancelEdit = () => {
    setEditingId(null); setTitle(''); setDescription(''); setImage(null); setExistingImage(null);
  };

  return (
    <div className="w-full text-[#333333] font-sans pb-10">
      
      {/* Official Page Header */}
      <div className="border-b-2 border-[#003366] pb-2 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#003366] uppercase m-0 tracking-wide">
          Institutional Achievements Module
        </h1>
        <p className="text-xs text-[#555555] font-bold uppercase mt-1">IEDC Portal • Official Milestones</p>
      </div>
      
      {/* Achievement Entry Form */}
      <div className="border border-[#CCCCCC] bg-white mb-10 shadow-sm relative max-w-4xl">
        <div className="bg-[#003366] text-white px-5 py-3 text-sm font-bold uppercase tracking-wider flex justify-between items-center border-b-4 border-orange-500">
          <span>{editingId ? 'MODIFY ACHIEVEMENT RECORD' : 'REGISTER NEW ACHIEVEMENT'}</span>
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
              <label className="text-xs font-bold text-[#333333] uppercase mb-1.5">Official Title <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full border border-[#CCCCCC] bg-[#F8F9FA] px-3 py-2.5 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#003366] focus:ring-1 focus:ring-[#003366] transition-none" 
                required 
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-xs font-bold text-[#333333] uppercase mb-1.5">Details & Description <span className="text-red-500">*</span></label>
              <textarea 
                rows="4" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="w-full border border-[#CCCCCC] bg-[#F8F9FA] px-3 py-2.5 text-sm font-medium focus:outline-none focus:bg-white focus:border-[#003366] focus:ring-1 focus:ring-[#003366] resize-y transition-none leading-relaxed" 
                required
              ></textarea>
            </div>

            <div className="flex flex-col md:w-1/2">
              <label className="text-xs font-bold text-[#333333] uppercase mb-1.5">Supporting Media / Certificate {existingImage && <span className="text-[#003366]">(Optional - Keeps Existing)</span>}</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setImage(e.target.files[0])} 
                className="w-full border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#003366] file:mr-4 file:py-1 file:px-3 file:border-0 file:text-xs file:font-bold file:bg-[#E5E7EB] file:text-[#333333] hover:file:bg-[#CCCCCC] transition-none" 
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-[#CCCCCC]">
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="bg-[#003366] text-white font-bold text-sm tracking-wider uppercase px-6 py-3 border border-[#002244] hover:bg-orange-500 hover:border-orange-600 disabled:opacity-70 disabled:cursor-not-allowed transition-none shadow-sm"
              >
                {isSubmitting ? 'PROCESSING...' : (editingId ? 'UPDATE RECORD' : 'REGISTER ACHIEVEMENT')}
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

      {/* Directory Table for Existing Achievements */}
      <div className="border border-[#CCCCCC] shadow-sm overflow-x-auto bg-white">
        <div className="bg-[#E5E7EB] border-b border-[#CCCCCC] px-4 py-3 text-sm font-bold text-[#003366] uppercase flex justify-between items-center">
          <span>Registered Milestones Directory</span>
          <span className="text-xs bg-white border border-[#CCCCCC] px-2 py-0.5 text-[#555555]">Total Records: {achievements.length}</span>
        </div>
        
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-[#F8F9FA] border-b-2 border-[#CCCCCC]">
            <tr>
              <th className="p-3 text-xs font-bold text-[#555555] border-r border-[#CCCCCC] w-12 text-center">S.NO.</th>
              <th className="p-3 text-xs font-bold text-[#555555] border-r border-[#CCCCCC]">ACHIEVEMENT TITLE & DETAILS</th>
              <th className="p-3 text-xs font-bold text-[#555555] w-40 text-center">ADMIN ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#CCCCCC]">
            {achievements.length > 0 ? (
              achievements.map((item, index) => (
                <tr key={item.id} className="hover:bg-[#F0F5FA] transition-none">
                  <td className="p-3 text-xs font-bold text-[#777777] border-r border-[#CCCCCC] text-center align-top">
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="p-3 border-r border-[#CCCCCC] align-top">
                    <div className="font-bold text-sm text-[#003366] mb-1">{item.title}</div>
                    <div className="text-xs text-[#555555] leading-relaxed line-clamp-2 md:line-clamp-none">{item.description}</div>
                  </td>
                  <td className="p-3 text-center align-top">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(item)} 
                        className="bg-[#E5E7EB] text-[#003366] text-[10px] font-bold uppercase px-3 py-1.5 border border-[#CCCCCC] hover:bg-[#003366] hover:text-white transition-colors"
                      >
                        MODIFY
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)} 
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
                <td colSpan="3" className="p-6 text-center text-sm text-[#777777] italic bg-[#F8F9FA]">
                  No achievement records found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
