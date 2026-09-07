'use client';

export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-serif text-gray-900 mb-2">Welcome Back</h1>
      <p className="text-gray-500 font-sans mb-10">Select a section from the sidebar to manage your website content.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-2">Quick Tip</h3>
          <p className="text-gray-700 font-sans">
            When uploading images for Events or Gallery, ensure they are high quality but under 2MB for faster loading times.
          </p>
        </div>
      </div>
    </div>
  );
}