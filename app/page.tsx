import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CorePillars from '@/components/CorePillars';
import AboutIEDC from '@/components/AboutIEDC';
import Events from '@/components/Events';
import Announcements from '@/components/Announcements';
import Achievements from '@/components/Achievements';
import Gallery from '@/components/Gallery';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import MotionChrome from '@/components/MotionChrome';
import SignalMarquee from '@/components/SignalMarquee';
import EngineeringDetails from '@/components/EngineeringDetails';

export default function Home() {
  return <main id="main-content" className="site-main"><MotionChrome /><EngineeringDetails /><Navbar /><Hero /><SignalMarquee /><CorePillars /><AboutIEDC /><Events /><Announcements /><Achievements /><Gallery /><Team /><Contact /><Footer /></main>;
}
