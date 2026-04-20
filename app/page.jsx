import { PublicSite } from "@/components/public-site";
import { initialSiteData } from "@/lib/site-data";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#08111f] text-white">
      <PublicSite siteData={initialSiteData} />
    </main>
  );
}