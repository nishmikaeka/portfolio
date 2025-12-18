import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-0 font-[family-name:var(--font-geist-sans)] pb-0">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}
