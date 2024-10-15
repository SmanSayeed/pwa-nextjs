import localFont from "next/font/local";
import "./globals.css";
import RootLayoutClient from "../components/RootLayoutClient";

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
  title: "CliniqueX",
  description:
    "Cliniquex helps you to track queue in any clinique or hospital",
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
