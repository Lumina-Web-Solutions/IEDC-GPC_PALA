'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real team members from NeonDB
  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch('/api/team');
        if (res.ok) {
          const data = await res.json();
          setMembers(data);
        }
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white flex justify-center">
        <div className="animate-pulse text-gray-400 font-bold tracking-widest uppercase">Loading Team...</div>
      </section>
    );
  }

  // Split the fetched data into Faculty and Students based on the category we set in the admin portal
  const faculty = members.filter(member => member.category === 'Faculty');
  const students = members.filter(member => member.category === 'Student');

  // Inside Team.jsx

const ProfileCard = ({ member }) => (
  <div className="flex flex-col items-center text-center group">
    {/* Changed w-40 h-40 to w-28 h-28 for mobile */}
    <div className="relative w-28 h-28 md:w-48 md:h-48 rounded-full overflow-hidden mb-4 md:mb-6 bg-gray-100 shadow-md">
      <Image 
        src={member.image_url || "/profile-placeholder.jpg"} 
        alt={member.name} 
        fill 
        className="object-cover transition-transform duration-500 group-hover:scale-110" 
      />
    </div>
    <h4 className="text-lg md:text-xl font-serif text-gray-900 mb-1 leading-tight">{member.name}</h4>
    <p className="text-xs md:text-sm font-sans tracking-wide text-gray-500 uppercase">{member.role}</p>
  </div>
  );

  return (
    <section id="team" className="py-24 bg-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Faculty Section (Only shows if faculty exist) */}
        {faculty.length > 0 && (
          <div className="mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h3 className="text-4xl font-serif text-gray-900">Our Mentors</h3>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-12 md:gap-24">
              {faculty.map((member, index) => (
                <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <ProfileCard member={member} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Student Executive Committee Section */}
        {students.length > 0 && (
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h3 className="text-4xl font-serif text-gray-900">Executive Committee</h3>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
              {students.map((member, index) => (
                <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <ProfileCard member={member} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}