import "./globals.css";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/layout/Layout";

export const metadata = {
  title: "Aniflux - Anime E-commerce & Blog Platform",
  description: "Shop amazing anime products and read insightful blog posts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Layout>
          {children}
        </Layout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
