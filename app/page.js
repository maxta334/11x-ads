import { Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ResponsiveLayout from "@/components/ResponsiveLayout";
import RevenueTestimonial from "@/components/RevenueTestimonial";
import Testimonials11 from "@/components/Testimonials11";
import DevHours from "@/components/DevHours";
import Testimonials3 from "@/components/Testimonials3";

export default function Home() {
  const desktopContent = (
    <>
      <main>
        <Hero />
        <RevenueTestimonial />
        <Testimonials11 />
        <DevHours />
        <Testimonials3 />
      </main>
    </>
  );

  const mobileContent = (
    <main className="flex flex-col">
      <Hero />
      <RevenueTestimonial />
      <Testimonials11 />
      <DevHours />
      <Testimonials3 />
    </main>
  );

  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <ResponsiveLayout 
        desktopContent={desktopContent}
        mobileContent={mobileContent}
      />
      <Footer />
    </>
  );
}
