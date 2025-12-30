import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BemoBio - Creative Developer",
  description: "Equal parts creative developer & designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className="antialiased"
        style={{ fontFamily: '"Google Sans", "Inter", system-ui, -apple-system, sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
