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

    try {
      const res = await fetch('/api/about', { method: 'PUT', body: formData });
      if (res.ok) {
        setMessage('SUCCESS: Institutional profile updated successfully.');
      } else {
        setMessage('ERROR: Failed to update institutional profile.');
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
          Institutional Info 
        </h1>
        <p className="text-xs text-[#555555] font-bold uppercase mt-1">IEDC Portal • About </p>
      </div>
      
      {/* Configuration Form */}
      <div className="border border-[#CCCCCC] bg-white mb-10 shadow-sm relative max-w-4xl">
        <div className="bg-[#003366] text-white px-5 py-3 text-sm font-bold uppercase tracking-wider flex justify-between items-center border-b-4 border-orange-500">
          <span>MODIFY INSTITUTIONAL DETAILS</span>
        </div>
        
        <div className="p-5 md:p-8">
          {message && (
            <div className={`mb-6 p-3 text-xs font-bold uppercase tracking-wide border ${message.includes('ERROR') ? 'bg-[#FFEEEE] border-[#CC0000] text-[#CC0000]' : 'bg-[#E5F6E5] border-[#008000] text-[#006600]'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* About Text Section */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-[#333333] uppercase mb-1.5">Official Profile / About IEDC <span className="text-red-500">*</span></label>
              <textarea 
                rows="4" 
                value={aboutText} 
                onChange={(e) => setAboutText(e.target.value)} 
                className="w-full border border-[#CCCCCC] bg-[#F8F9FA] px-3 py-2.5 text-sm font-medium focus:outline-none focus:bg-white focus:border-[#003366] focus:ring-1 focus:ring-[#003366] resize-y transition-none leading-relaxed" 
                required
              ></textarea>
            </div>

            {/* Vision Section */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-[#333333] uppercase mb-1.5">Institutional Vision <span className="text-red-500">*</span></label>
              <textarea 
                rows="3" 
                value={vision} 
                onChange={(e) => setVision(e.target.value)} 
                className="w-full border border-[#CCCCCC] bg-[#F8F9FA] px-3 py-2.5 text-sm font-medium focus:outline-none focus:bg-white focus:border-[#003366] focus:ring-1 focus:ring-[#003366] resize-y transition-none leading-relaxed" 
                required
              ></textarea>
            </div>

            {/* Media Upload */}
            <div className="flex flex-col md:w-1/2">
              <label className="text-xs font-bold text-[#333333] uppercase mb-1.5">Cover Media Asset {existingImage && <span className="text-[#003366]">(Optional - Keeps Existing)</span>}</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setImage(e.target.files[0])} 
                className="w-full border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#003366] file:mr-4 file:py-1 file:px-3 file:border-0 file:text-xs file:font-bold file:bg-[#E5E7EB] file:text-[#333333] hover:file:bg-[#CCCCCC] transition-none" 
              />
            </div>

            {/* Dynamic Objectives List */}
            <div className="pt-6 border-t border-[#CCCCCC]">
              <div className="flex justify-between items-center mb-4">
                <label className="text-xs font-bold text-[#333333] uppercase">Core Objectives</label>
                <button 
                  type="button" 
                  onClick={addObjective} 
                  className="text-xs font-bold text-[#003366] bg-[#E5E7EB] hover:bg-[#CCCCCC] px-3 py-1.5 border border-[#BBBBBB] transition-none"
                >
                  + ADD OBJECTIVE ENTRY
                </button>
              </div>
              
              {objectives.map((obj, index) => (
                <div key={index} className="flex gap-3 mb-4 items-start md:items-center bg-[#F8F9FA] p-3 border border-[#E5E7EB]">
                  <span className="text-xs font-bold text-[#777777] mt-2.5 md:mt-0 w-6 text-center">{(index + 1).toString().padStart(2, '0')}</span>
                  <input 
                    type="text" 
                    value={obj} 
                    onChange={(e) => handleObjectiveChange(index, e.target.value)} 
                    className="w-full border border-[#CCCCCC] bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#003366]" 
                    placeholder="Enter objective details..."
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => removeObjective(index)} 
                    className="text-[#CC0000] font-bold text-sm bg-white border border-[#CC0000] px-3 py-1.5 hover:bg-[#FFEEEE] shrink-0"
                    title="Remove Objective"
                  >
                    REMOVE
                  </button>
                </div>
              ))}
              
              {objectives.length === 0 && (
                <div className="p-4 bg-[#F8F9FA] border border-[#E5E7EB] text-center text-xs text-[#777777] italic">
                  No objectives defined. Click "+ Add Objective Entry" to append institutional goals.
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#CCCCCC]">
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="bg-[#003366] text-white font-bold text-sm tracking-wider uppercase px-8 py-3 border border-[#002244] hover:bg-orange-500 hover:border-orange-600 disabled:opacity-70 disabled:cursor-not-allowed transition-none shadow-sm"
              >
                {isSubmitting ? 'PROCESSING UPDATE...' : 'SAVE INSTITUTIONAL PROFILE'}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
