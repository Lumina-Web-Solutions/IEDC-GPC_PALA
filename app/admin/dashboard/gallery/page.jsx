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
    if (!confirm('Remove this photo from the gallery?')) return;
    const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchPhotos();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return setMessage('Please select an image.');
    
    setIsSubmitting(true);
    setMessage('');

    const formData = new FormData();
    formData.append('image', image);

    const res = await fetch('/api/gallery', { method: 'POST', body: formData });
    if (res.ok) {
      setMessage('Photo uploaded successfully!');
      setImage(null);
      // Reset the file input visually
      document.getElementById('gallery-upload').value = '';
      fetchPhotos();
    } else {
      setMessage('Failed to upload photo.');
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-serif text-gray-900 mb-8">Manage Gallery</h1>
      
      {/* Upload Section */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-2xl mb-12">
        <h2 className="text-lg font-bold tracking-widest text-gray-400 uppercase mb-6">Upload New Photo</h2>
        {message && <div className="mb-6 p-4 bg-gray-50 text-gray-900 text-sm rounded-lg border">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <input 
              id="gallery-upload"
              type="file" 
              accept="image/*" 
              onChange={(e) => setImage(e.target.files[0])} 
              className="border border-gray-300 rounded-lg p-2 text-gray-900" 
              required 
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="bg-gray-900 text-white font-bold uppercase py-4 px-8 rounded-full hover:bg-black w-full md:w-auto">
            {isSubmitting ? 'Uploading...' : 'Upload Photo'}
          </button>
        </form>
      </div>

      {/* Image Grid */}
      <h2 className="text-2xl font-serif text-gray-900 mb-6">Live Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group bg-gray-100 rounded-xl overflow-hidden aspect-square border border-gray-200 shadow-sm">
            <Image 
              src={photo.image_url} 
              alt="Gallery image" 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            {/* Delete button overlay that appears on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => handleDelete(photo.id)} 
                className="bg-red-600 text-white font-bold uppercase text-xs px-4 py-2 rounded-full hover:bg-red-700 transform scale-90 group-hover:scale-100 transition-transform"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {photos.length === 0 && <p className="text-gray-500 col-span-full">No photos in the gallery yet.</p>}
      </div>
    </div>
  );
}