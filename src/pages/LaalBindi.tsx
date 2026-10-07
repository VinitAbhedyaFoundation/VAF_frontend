
import { Navigation } from '../components/LaalBindi/Navigation';
import { Hero } from '../components/LaalBindi/Hero';
import { About } from '../components/LaalBindi/About';
import { WhyItMatters } from '../components/LaalBindi/WhyItMatters';
import { WhatWeDo } from '../components/LaalBindi/WhatWeDo';
import { MythTruth } from '../components/LaalBindi/MythTruth';
import { Impact } from '../components/LaalBindi/Impact';
import { EventGallery } from '../components/LaalBindi/EventGallery';
import { Foundation } from '../components/LaalBindi/Foundation';
import { CTA } from '../components/LaalBindi/CTA';
import { Footer } from '../components/LaalBindi/Footer';

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <WhyItMatters />
      <WhatWeDo />
      <MythTruth />
      <Impact />
      <EventGallery />
      <Foundation />
      <CTA />
      <Footer />
    </div>
  );
}