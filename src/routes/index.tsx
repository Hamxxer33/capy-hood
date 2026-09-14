import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { ApplySection } from "@/components/apply-section";
import { Hero } from "@/components/hero";
import { HoodGallery } from "@/components/hood-gallery";
import { HoodMarquee } from "@/components/marquee";
import { Manifesto } from "@/components/manifesto";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { loadPass, type HoodPass } from "@/lib/pass";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [pass, setPass] = useState<HoodPass | null>(null);

  useEffect(() => {
    setPass(loadPass());
  }, []);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="grain" aria-hidden="true" />
      <SiteHeader hasPass={!!pass} />
      <main>
        <Hero />
        <HoodMarquee />
        <HoodGallery />
        <ApplySection pass={pass} onPass={setPass} />
        <Manifesto />
      </main>
      <SiteFooter />
      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          className:
            "!bg-surface !text-fg !border-0 !shadow-[0_0_0_1px_rgba(243,237,227,0.12)]",
        }}
      />
    </div>
  );
}
