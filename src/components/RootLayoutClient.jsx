"use client";

import React from "react";
import InstallPWAButton from "./InstallPWAButton";
// import AddToHomeScreen from "/PWAComponents/AddToHomeScreen";

export default function RootLayoutClient({ children }) {
  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return (
    <>
      {/* Header */}
      <header className="bg-blue-800 text-white py-4 px-6 md:px-12 flex justify-between items-center shadow-lg">
        <h2 className="text-xl md:text-2xl font-semibold">CliniqueX</h2>
        <div>
          <InstallPWAButton />
          {/* You can uncomment this if you want to show userAgentString */}
          {/* {userAgentString && (
            <p className="text-center text-xs text-gray-400">{userAgentString}</p>
          )} */}
        </div>
      </header>

      {/* Body */}
      <main className="w-full min-h-[80vh] flex flex-col items-center justify-center py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-screen-lg w-full">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-4 px-6 md:px-12 flex justify-center items-center">
        <p className="text-sm md:text-base">
          © 2024 PWA Example. All rights reserved.
        </p>
      </footer>
    </>
  );
}
