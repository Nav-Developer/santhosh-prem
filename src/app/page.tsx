import HeroMotion from "@/components/sections/HeroMotion";
import StoryScroll from "@/components/sections/StoryScroll";
import AboutPage from "@/components/ui/AboutPage";
import ExperiencePage from "@/components/ui/ExperiencePage";
import ServicesPage from "@/components/ui/ServicesPage";

export default function Home() {
  return (
    <>
      <HeroMotion />
      <StoryScroll />

      <section id="about">
        <AboutPage />
      </section>

      <section id="experience">
        <ExperiencePage />
      </section>

      <section id="services">
        <ServicesPage />
      </section>
    </>
  );
}
