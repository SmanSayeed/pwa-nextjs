"use client";

import React from "react";
import AddToMobileChrome from "./PWAComponents/AddToMobileChrome";
import useUserAgent from '../hooks/useUserAgent';
import AddToHomeScreen from "./PWAComponents/AddToHomeScreen";

export default function RootLayoutClient({ children }) {

  const { isMobile, userAgentString ,userAgent } = useUserAgent();

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
      <div className="w-[100%] h-[100px] bg-blue-800 text-white flex justify-between items-center">
       <h2>PWA Example</h2>
       <div className="">
       {userAgentString && <p className="text-center text-xs text-gray-400">{userAgentString}</p>}
      <AddToHomeScreen />
       </div>
      </div>
      <div className="w-[100%] h-[80vh]">{children}</div>
      <div className="w-[100%] h-[100px] bg-blue-800 text-white">Footer</div>
    </>
  );
}
