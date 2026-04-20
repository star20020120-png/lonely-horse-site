"use client";

import { useState } from "react";
import { AdminPanel } from "@/components/admin-panel";
import { initialSiteData } from "@/lib/site-data";

export default function AdminPage() {
  const [siteData, setSiteData] = useState(initialSiteData);

  return (
    <main className="min-h-screen bg-[#08111f] text-white">
      <AdminPanel
        siteData={siteData}
        setSiteData={setSiteData}
        onBackToSite={() => {
          window.location.href = "/";
        }}
      />
    </main>
  );
}