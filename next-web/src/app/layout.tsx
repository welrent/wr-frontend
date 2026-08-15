import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  DEFAULT_CONTENT,
  DEFAULT_FOOTER,
  DEFAULT_NAVBAR,
} from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Welrent App | Find your drive",
  description: "The smartest auto sharing and rental app.",
  icons: {
    icon: "/assets/WLR_FAVICON.png",
  },
};

async function getNavFooterData() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBase) return { navbar: DEFAULT_NAVBAR, footer: DEFAULT_FOOTER };
  try {
      const res = await fetch(`${apiBase}/api/nav_footer`, { cache: 'no-store' });
      if (!res.ok) return { navbar: DEFAULT_NAVBAR, footer: DEFAULT_FOOTER };
      const data = await res.json();
      return {
        navbar: data.navbar?.length ? data.navbar : DEFAULT_NAVBAR,
        footer: Object.keys(data.footer || {}).length ? data.footer : DEFAULT_FOOTER,
      };
  } catch {
      return { navbar: DEFAULT_NAVBAR, footer: DEFAULT_FOOTER };
  }
}

async function getSiteContent() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBase) return DEFAULT_CONTENT;
  try {
      const res = await fetch(`${apiBase}/api/content`, { cache: 'no-store' });
      if (!res.ok) return DEFAULT_CONTENT;
      const data = await res.json();
      return Object.keys(data || {}).length ? data : DEFAULT_CONTENT;
  } catch {
      return DEFAULT_CONTENT;
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
        {/* Vendored from https://github.com/welrent/Act js/sdk/welrent-sdk.js */}
        <Script src="/js/sdk/welrent-sdk.js" strategy="afterInteractive" />
        <Header navbarLinks={data.navbar} />
        {children}
        <Footer footerLinks={data.footer} content={content} />
      </body>
    </html>
  );
}
