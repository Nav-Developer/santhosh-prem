import AlternateHeroSection from "@/components/sections/AlternateHeroSection";
import CoachingSection from "@/components/sections/CoachingSection";
import DiscountCodes from "@/components/sections/DiscountCodes";
// import HeroMotion from "@/components/sections/HeroMotion";
import StoryScroll from "@/components/sections/StoryScroll";
import SupplementLinks from "@/components/sections/SupplementLinks";
import AboutPage from "@/components/ui/AboutPage";
import ExperiencePage from "@/components/ui/ExperiencePage";
import ScrollProgress from "@/components/ui/ScrollProgress";
// import VideosSection from "@/components/ui/YT/VideosSection";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      {/* <AlternateHeroSection /> */}
      <AlternateHeroSection />
      <DiscountCodes />
      <section id="about">
        <AboutPage />
      </section>
      <StoryScroll />
      <section id="experience">
        <ExperiencePage />
      </section>
      <section id="coaching">
        <CoachingSection />
      </section>
      <SupplementLinks />
      {/* <VideosSection /> */}
    </>
  );
}
