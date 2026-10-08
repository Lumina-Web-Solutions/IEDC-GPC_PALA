'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ManageGallery() {
  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const fetchPhotos = async () => {
    const res = await fetch('/api/gallery');
    if (res.ok) setPhotos(await res.json());
  };

  useEffect(() => { fetchPhotos(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('WARNING: Are you sure you want to permanently revoke this media asset? This action cannot be undone.')) return;
    const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchPhotos();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return setMessage('ERROR: Please select a valid media asset.');
    
    setIsSubmitting(true);
    setMessage('');

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch('/api/gallery', { method: 'POST', body: formData });
      if (res.ok) {
        setMessage('SUCCESS: Media asset officially registered.');
        setImage(null);
        // Reset the file input visually
        document.getElementById('gallery-upload').value = '';
        fetchPhotos();
      } else {
        setMessage('ERROR: Failed to process request.');
      }
    } catch (error) {
      setMessage('ERROR: System failure during transmission.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="w-full text-[#333333] font-sans pb-10">
      
      {/* Official Page Header */}
      <div className="border-b-2 border-[#003366] pb-2 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#003366] uppercase m-0 tracking-wide">
          Official Media Repository Module
        </h1>
        <p className="text-xs text-[#555555] font-bold uppercase mt-1">IEDC Portal • Visual Records</p>
      </div>
      
      {/* Upload Section */}
      <div className="border border-[#CCCCCC] bg-white mb-10 shadow-sm relative max-w-3xl">
        <div className="bg-[#003366] text-white px-5 py-3 text-sm font-bold uppercase tracking-wider flex justify-between items-center border-b-4 border-orange-500">
          <span>REGISTER NEW MEDIA ASSET</span>
        </div>
        
        <div className="p-5 md:p-8">
          {message && (
            <div className={`mb-6 p-3 text-xs font-bold uppercase tracking-wide border ${message.includes('ERROR') ? 'bg-[#FFEEEE] border-[#CC0000] text-[#CC0000]' : 'bg-[#E5F6E5] border-[#008000] text-[#006600]'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-[#333333] uppercase mb-1.5">Official Image File <span className="text-red-500">*</span></label>
              <input 
                id="gallery-upload"
                type="file" 
                accept="image/*" 
                onChange={(e) => setImage(e.target.files[0])} 
                className="w-full border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#003366] file:mr-4 file:py-1.5 file:px-4 file:border file:border-[#CCCCCC] file:text-xs file:font-bold file:bg-[#E5E7EB] file:text-[#333333] hover:file:bg-[#CCCCCC] transition-none cursor-pointer" 
                required 
              />
            </div>
            
            <div className="pt-2 border-t border-[#CCCCCC]">
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="bg-[#003366] text-white font-bold text-sm tracking-wider uppercase px-8 py-3 border border-[#002244] hover:bg-orange-500 hover:border-orange-600 disabled:opacity-70 disabled:cursor-not-allowed transition-none shadow-sm"
              >
                {isSubmitting ? 'PROCESSING TRANSFER...' : 'PUBLISH ASSET'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Directory Grid for Existing Media */}
      <div className="border border-[#CCCCCC] shadow-sm bg-white">
        <div className="bg-[#E5E7EB] border-b border-[#CCCCCC] px-4 py-3 text-sm font-bold text-[#003366] uppercase flex justify-between items-center">
          <span>Registered Media Directory</span>
          <span className="text-xs bg-white border border-[#CCCCCC] px-2 py-0.5 text-[#555555]">Total Assets: {photos.length}</span>
        </div>
        
        <div className="p-4 md:p-6 bg-[#F8F9FA]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group bg-white aspect-square border-2 border-[#CCCCCC] hover:border-[#003366] transition-none overflow-hidden flex flex-col">
                
                <div className="relative flex-1 w-full h-full">
                  <Image 
                    src={photo.image_url} 
                    alt="Official Gallery Asset" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                
                {/* ID Tag overlay (visible by default to look like a database) */}
                <div className="absolute top-0 left-0 bg-[#003366]/80 text-white text-[9px] font-mono px-1.5 py-0.5 border-b border-r border-[#CCCCCC]">
                  ID: {String(photo.id).slice(0, 5).toUpperCase()}
                </div>

                {/* Strict Admin Overlay */}
                <div className="absolute inset-0 bg-[#002244]/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center backdrop-blur-sm">
                  <span className="text-[10px] text-white font-bold uppercase tracking-wider mb-2">Admin Action Required</span>
                  <button 
                    onClick={() => handleDelete(photo.id)} 
                    className="bg-[#CC0000] text-white font-bold uppercase text-[11px] px-4 py-2 border border-[#990000] hover:bg-[#990000] transition-none w-full shadow-sm"
                  >
                    REVOKE ASSET
                  </button>
                </div>
              </div>
            ))}
            
            {photos.length === 0 && (
              <div className="col-span-full p-8 text-center text-sm text-[#777777] italic bg-white border border-[#CCCCCC]">
                No media assets found in the repository.
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
