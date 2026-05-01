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
import { getSiteConfig } from "../../lib/supabase/queries";

export default async function Home() {
  const config = await getSiteConfig();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <EventInfo />
        <VideoRecap />
        {config.show_past_talks && <PastTalks />}
        <AboutGDG />
        {config.show_pricing && <Pricing />}
        {config.show_map && <MapLocation />}
        {config.show_sponsors && <Sponsors />}
        {config.show_cfp && <CFPSection />}
      </main>
      <Footer />
    </div>
  );
}
