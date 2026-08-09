import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { GaleriHighlight } from "@/components/home/GaleriHighlight";
import { Hero } from "@/components/home/Hero";
import { ProgramHighlight } from "@/components/home/ProgramHighlight";
import { ReadyToJoin } from "@/components/home/ReadyToJoin";
import { TestimoniStatistik } from "@/components/home/TestimoniStatistik";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export function HomePage() {
  return (
    <>
      <AnimateOnScroll animation="fadeIn">
        <Hero />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fadeInUp">
        <WhyChooseUs />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fadeInUp">
        <ProgramHighlight />
      </AnimateOnScroll>
      {/* <ArtikelTerbaru /> */}
      <AnimateOnScroll animation="fadeInUp">
        <GaleriHighlight />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fadeInUp">
        <TestimoniStatistik />
      </AnimateOnScroll>
      <AnimateOnScroll animation="zoomIn">
        <ReadyToJoin />
      </AnimateOnScroll>
    </>
  );
}
