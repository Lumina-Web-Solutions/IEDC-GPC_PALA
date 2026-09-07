import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CorePillars from "@/components/CorePillars";
import AboutIEDC from "@/components/AboutIEDC";
import Events from "@/components/Events";
import Announcements from "@/components/Announcements";
import Achievements from "@/components/Achievements";
import Gallery from "@/components/Gallery";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen text-gray-900">
      <Navbar />
      <Hero />
      <CorePillars />
      <AboutIEDC />
      <Events />
      <Announcements />
      <Achievements />
      <Gallery />
      <Team />
      <Contact />
      <Footer />
      
      {/* We will add the Core Pillars, About, and Events here next */}
    </main>
  );
}