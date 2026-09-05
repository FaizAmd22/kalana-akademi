import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { EventHighlight } from "@/components/home/EventHighlight";
import { GaleriHighlight } from "@/components/home/GaleriHighlight";
import { Hero } from "@/components/home/Hero";
import { ProgramHighlight } from "@/components/home/ProgramHighlight";
import { ReadyToJoin } from "@/components/home/ReadyToJoin";
import { TestimoniStatistik } from "@/components/home/TestimoniStatistik";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ArtikelTerbaru } from "@/components/home/ArtikelTerbaru";

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
      <AnimateOnScroll animation="fadeInUp">
        <GaleriHighlight />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fadeInUp">
        <ArtikelTerbaru />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fadeInUp">
        <EventHighlight />
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
