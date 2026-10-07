import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { ArtikelTerbaru } from "@/components/home/ArtikelTerbaru";
import { EventHighlight } from "@/components/home/EventHighlight";
import { GaleriHighlight } from "@/components/home/GaleriHighlight";
import { Hero } from "@/components/home/Hero";
import { ProgramHighlight } from "@/components/home/ProgramHighlight";
import { ReadyToJoin } from "@/components/home/ReadyToJoin";
import { StatistikBar } from "@/components/home/StatistikBar";
import { TentorHighlight } from "@/components/home/TentorHighlight";
import { TestimoniHighlight } from "@/components/home/TestimoniHighlight";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FixedBackgroundSection } from "@/components/shared/FixedBackgroundSection";
import { ParallaxSection } from "@/components/shared/ParallaxSection";
import bgSection from "@/assets/images/bg-section.webp";
import bgSection2 from "@/assets/images/bg-section-2.webp";

// Section backgrounds alternate (light blue parallax / photo backdrops). The
// band sits outside AnimateOnScroll so only the content fades in — and so the
// fixed photo layers aren't trapped inside a transformed element.

export function HomePage() {
  return (
    <>
      {/* above the fold: fade in straight away instead of waiting for an
          IntersectionObserver callback, so the main content paints sooner */}
      <div className="animate__animated animate__fadeIn [animation-duration:0.6s]">
        <Hero />
      </div>
      <AnimateOnScroll animation="fadeInUp">
        <StatistikBar />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fadeInUp">
        <WhyChooseUs />
      </AnimateOnScroll>
      <ParallaxSection variant="dots" tinted>
        <AnimateOnScroll animation="fadeInUp">
          <ProgramHighlight />
        </AnimateOnScroll>
      </ParallaxSection>
      <FixedBackgroundSection image={bgSection2}>
        <AnimateOnScroll animation="fadeInUp">
          <TentorHighlight onDark />
        </AnimateOnScroll>
      </FixedBackgroundSection>
      <ParallaxSection variant="grid" tinted>
        <AnimateOnScroll animation="fadeInUp">
          <GaleriHighlight />
        </AnimateOnScroll>
      </ParallaxSection>
      <AnimateOnScroll animation="fadeInUp">
        <ArtikelTerbaru />
      </AnimateOnScroll>
      <FixedBackgroundSection image={bgSection}>
        <AnimateOnScroll animation="fadeInUp">
          <EventHighlight onDark />
        </AnimateOnScroll>
      </FixedBackgroundSection>
      <ParallaxSection variant="dots-reverse" tinted>
        <AnimateOnScroll animation="fadeInUp">
          <TestimoniHighlight />
        </AnimateOnScroll>
      </ParallaxSection>
      <AnimateOnScroll animation="zoomIn">
        <ReadyToJoin />
      </AnimateOnScroll>
    </>
  );
}
