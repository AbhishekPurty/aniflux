import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/layout/Layout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Aniflux - E-commerce & Blog Platform",
  description: "Shop amazing products and read insightful blog posts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>
          {children}
        </Layout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
