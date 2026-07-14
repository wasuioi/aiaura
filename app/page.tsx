import { BackgroundGlows } from "@/app/components/BackgroundGlows";
import { Nav } from "@/app/components/Nav";
import { Hero } from "@/app/components/Hero";
import { Features } from "@/app/components/Features";
import { CTA } from "@/app/components/CTA";
import { Footer } from "@/app/components/Footer";

// LogoStrip removed: it rendered fabricated customer names
// (Nebula, Vertex, Quanta...). For a portfolio piece with no real
// customers, no trust section is more credible than a fake one —
// reviewers who check closely will spot invented logos immediately,
// and that costs more trust than the section was ever going to add.

export default function Home() {
  return (
    <main className="relative min-h-screen flex-1 overflow-x-clip">
      <BackgroundGlows />
      <Nav />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
