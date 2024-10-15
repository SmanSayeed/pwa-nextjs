import localFont from "next/font/local";
import "./globals.css";
import RootLayoutClient from "../components/Layout/RootLayoutClient";

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
  title: "MovieMaster",
  description:
    "MovieMaster PWA helps you find the latest movies with an easy search by genre, year, and more. It works smoothly on any device, even offline, giving you a great movie browsing experience.",
  manifest: "/web.manifest",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootLayoutClient>
        {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
