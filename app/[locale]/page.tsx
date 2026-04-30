import Header from "../components/Header";
import Hero from "../components/Hero";
import EventInfo from "../components/EventInfo";
import VideoRecap from "../components/VideoRecap";
import PastTalks from "../components/PastTalks";
import AboutGDG from "../components/AboutGDG";
import Pricing from "../components/Pricing";
import MapLocation from "../components/MapLocation";
import Sponsors from "../components/Sponsors";
import CFPSection from "../components/CFPSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <EventInfo />
        <VideoRecap />
        <PastTalks />
        <AboutGDG />
        <Pricing />
        <MapLocation />
        <Sponsors />
        <CFPSection />
      </main>
      <Footer />
    </div>
  );
}
