import CoachingSection from "@/components/sections/CoachingSection";
import HeroMotion from "@/components/sections/HeroMotion";
import StoryScroll from "@/components/sections/StoryScroll";
import SupplementLinks from "@/components/sections/SupplementLinks";
import AboutPage from "@/components/ui/AboutPage";
import ExperiencePage from "@/components/ui/ExperiencePage";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <HeroMotion />
      <section id="about">
        <AboutPage />
      </section>
      <StoryScroll />
      <section id="experience">
        <ExperiencePage />
      </section>
      <CoachingSection />
      <SupplementLinks />
    </>
  );
}
