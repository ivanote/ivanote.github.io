import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Education from "@/components/Education";
import Waterpolo from "@/components/Waterpolo";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { PROFILE } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.fullName,
  jobTitle: "Full Stack Developer",
  email: `mailto:${PROFILE.email}`,
  telephone: PROFILE.phoneHref,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Terrassa",
    addressRegion: "Barcelona",
    addressCountry: "ES",
  },
  sameAs: [PROFILE.linkedin],
  knowsAbout: [
    "Laravel",
    "React",
    "Next.js",
    "TypeScript",
    "PHP",
    "Docker",
    "MySQL",
    "Microservices",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <div className="-mt-4 pb-4">
          <Stats />
        </div>
        <About />
        <Experience />
        <Stack />
        <Education />
        <Waterpolo />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
