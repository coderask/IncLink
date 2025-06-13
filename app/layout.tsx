import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IncLink - Connecting Formerly Incarcerated Individuals with Opportunities",
  description: "A professional network connecting formerly incarcerated individuals with employment opportunities and supportive community connections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
