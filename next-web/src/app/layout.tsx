import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Welrent App | Find your drive",
  description: "The smartest auto sharing and rental app.",
  icons: {
    icon: "/assets/WLR_FAVICON.png",
  },
};

async function getNavFooterData() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBase) return { navbar: [], footer: {} };
  try {
      const res = await fetch(`${apiBase}/api/nav_footer`, { cache: 'no-store' });
      if (!res.ok) return { navbar: [], footer: {} };
      return await res.json();
  } catch (error) {
      return { navbar: [], footer: {} };
  }
}

async function getSiteContent() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBase) return {};
  try {
      const res = await fetch(`${apiBase}/api/content`, { cache: 'no-store' });
      if (!res.ok) return {};
      return await res.json();
  } catch (error) {
      return {};
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getNavFooterData();
  const content = await getSiteContent();

  return (
    <html lang="en">
      <head>
          <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header navbarLinks={data.navbar} />
        {children}
        <Footer footerLinks={data.footer} content={content} />
      </body>
    </html>
  );
}
