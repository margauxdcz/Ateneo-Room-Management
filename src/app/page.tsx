import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Features from "@/components/sections/Features";
import CampusMap from "@/components/sections/CampusMap";
import Closing from "@/components/sections/Closing";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <Stats /> */}
      <Features />
      <CampusMap />
      <Closing />
    </main>
  );
}