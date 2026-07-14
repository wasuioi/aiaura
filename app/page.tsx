import { Nav } from "@/app/components/Nav";
import { Hero } from "@/app/components/Hero";
import { Features } from "@/app/components/Features";
import { CTA } from "@/app/components/CTA";
import { Footer } from "@/app/components/Footer";

// Removed in this revision:
// - LogoStrip (fabricated customer logos)
// - BackgroundGlows (full-page violet radial glow blobs — decorative glow
//   on dark backgrounds is a top "AI default" signal, and the page's one
//   animated moment now lives inside DashboardPreview)

export default function Home() {
  return (
    <main className="relative min-h-screen flex-1 overflow-x-clip">
      <Nav />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
