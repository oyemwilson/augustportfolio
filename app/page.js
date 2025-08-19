import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import Loader from './components/Loader';
import { Suspense } from 'react';
import ErrorBoundary from './error-boundary';

async function getData() {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error('Fetch error:', error);
    return []; // Return empty array on error
  }
}

export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning>
      <ErrorBoundary fallback={<div>Error loading content</div>}>
        <Suspense fallback={<Loader />}>
          <HeroSection />
          <AboutSection />
          <Experience />
          <Skills />
          <Projects />
          <Education />
          <ContactSection />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}