import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Repo Health Dashboard",
  description: "Track the health of your GitHub repositories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
