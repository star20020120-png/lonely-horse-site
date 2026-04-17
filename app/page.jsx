"use client";

import { useState } from "react";
import { PublicSite } from "@/components/public-site";
import { AdminPanel } from "@/components/admin-panel";
import { initialSiteData } from "@/lib/site-data";

export default function Page() {
  const [mode, setMode] = useState("public");
  const [siteData, setSiteData] = useState(initialSiteData);

  return (
    <main className="min-h-screen bg-[#08111f] text-white">
      {mode === "public" ? (
        <PublicSite
          siteData={siteData}
          onOpenAdmin={() => setMode("admin")}
        />
      ) : (
        <AdminPanel
          siteData={siteData}
          setSiteData={setSiteData}
          onBackToSite={() => setMode("public")}
        />
      )}
    </main>
  );
}