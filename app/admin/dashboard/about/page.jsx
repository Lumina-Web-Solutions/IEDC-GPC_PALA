'use client';
import { useState, useEffect } from 'react';

export default function ManageAbout() {
  const [vision, setVision] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [objectives, setObjectives] = useState([]);
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAbout = async () => {
      const res = await fetch('/api/about');
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setVision(data.vision);
          setAboutText(data.about_text);
          setObjectives(data.objectives || []);
          setExistingImage(data.image_url);
        }
      }
    };
    fetchAbout();
  }, []);

  const handleObjectiveChange = (index, value) => {
    const newObj = [...objectives];
    newObj[index] = value;
    setObjectives(newObj);
  };

  const addObjective = () => setObjectives([...objectives, '']);
  const removeObjective = (index) => setObjectives(objectives.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const formData = new FormData();
    formData.append('vision', vision);
    formData.append('about_text', aboutText);
    // Filter out empty strings before saving
    formData.append('objectives', JSON.stringify(objectives.filter(obj => obj.trim() !== '')));
    
    if (image) formData.append('image', image);
    else if (existingImage) formData.append('existingImage', existingImage);

    const res = await fetch('/api/about', { method: 'PUT', body: formData });
    if (res.ok) {
      setMessage('About section updated successfully!');
    } else {
      setMessage('An error occurred.');
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-serif text-gray-900 mb-8">Manage About Content</h1>
      
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-3xl mb-12">
        {message && <div className="mb-6 p-4 bg-gray-50 text-gray-900 text-sm rounded-lg border">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">About IEDC Text</label>
            <textarea rows="4" value={aboutText} onChange={(e) => setAboutText(e.target.value)} className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-gray-900 resize-none" required></textarea>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Our Vision</label>
            <textarea rows="3" value={vision} onChange={(e) => setVision(e.target.value)} className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-gray-900 resize-none" required></textarea>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Cover Image {existingImage && '(Leave blank to keep current)'}</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="border border-gray-300 rounded-lg p-2 text-gray-900" />
          </div>

          {/* Dynamic Objectives List */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-semibold text-gray-700">Objectives</label>
              <button type="button" onClick={addObjective} className="text-xs font-bold text-gray-900 bg-gray-100 px-4 py-2 rounded-full">
                + Add Objective
              </button>
            </div>
            
            {objectives.map((obj, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <input type="text" value={obj} onChange={(e) => handleObjectiveChange(index, e.target.value)} className="border border-gray-300 rounded-lg p-3 w-full text-sm text-gray-900" required />
                <button type="button" onClick={() => removeObjective(index)} className="text-red-500 font-bold shrink-0">✕</button>
              </div>
            ))}
          </div>

          <button type="submit" disabled={isSubmitting} className="bg-gray-900 text-white font-bold uppercase py-4 px-8 rounded-full hover:bg-black w-full">
            {isSubmitting ? 'Saving Changes...' : 'Update About Section'}
          </button>
        </form>
      </div>
    </div>
  );
}