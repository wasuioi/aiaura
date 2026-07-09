import { BackgroundGlows } from "@/app/components/BackgroundGlows";
import { Nav } from "@/app/components/Nav";
import { Hero } from "@/app/components/Hero";
import { LogoStrip } from "@/app/components/LogoStrip";
import { Features } from "@/app/components/Features";
import { CTA } from "@/app/components/CTA";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen flex-1 overflow-x-clip">
      <BackgroundGlows />
      <Nav />
      <Hero />
      <LogoStrip />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
