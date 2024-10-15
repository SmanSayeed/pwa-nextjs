import React, { useEffect, useState } from 'react';

export default function useUserAgent() {
    /**
     * We set our initial state as null because we don't know what the user agent is yet
     * that way we can check if the user agent has been set or not
     */
    const [isMobile, setIsMobile] = useState(null);
    const [userAgent, setUserAgent] = useState(null);
    const [isIOS, setIsIOS] = useState(null);
    const [isStandalone, setIsStandalone] = useState(null);
    const [userAgentString, setUserAgentString] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userAgentString = window.navigator.userAgent;
            setUserAgentString(userAgentString);
            let userAgent;

            /**
             * Parse user agent string to determine browser
             * The order of the if statements is important because some browsers
             * have multiple matches in their user agent string
             */
            if (userAgentString.indexOf('SamsungBrowser') > -1) {
                userAgent = 'SamsungBrowser';
            } else if (userAgentString.indexOf('Firefox') > -1) {
                userAgent = 'Firefox';
            } else if (userAgentString.indexOf('FxiOS') > -1) {
                userAgent = 'FirefoxiOS';
            } else if (userAgentString.indexOf('CriOS') > -1) {
                userAgent = 'ChromeiOS';
            } else if (userAgentString.indexOf('Chrome') > -1) {
                userAgent = 'Chrome';
            } else if (userAgentString.indexOf('Safari') > -1 && userAgentString.indexOf('Chrome') === -1) {
                userAgent = 'Safari';
            } else if (userAgentString.indexOf('Edge') > -1 || userAgentString.indexOf('Edg') > -1) {
                userAgent = 'Edge';
            } else if (userAgentString.indexOf('Opera') > -1 || userAgentString.indexOf('OPR') > -1) {
                userAgent = 'Opera';
            } else if (userAgentString.indexOf('Trident') > -1 || userAgentString.indexOf('MSIE') > -1) {
                userAgent = 'Internet Explorer';
            } else {
                userAgent = 'unknown';
            }
            setUserAgent(userAgent);

            // Check if user agent is mobile
            const isIOS = userAgentString.match(/iPhone|iPad|iPod/i);
            const isAndroid = userAgentString.match(/Android/i);
            setIsIOS(!!isIOS);
            const isMobile = !!(isIOS || isAndroid);
            setIsMobile(isMobile);

            // Check if app is installed (if it's installed we won't show the prompt)
            if (window.matchMedia('(display-mode: standalone)').matches) {
                setIsStandalone(true);
            }
        }
    }, []);

    return { isMobile, userAgent, isIOS, isStandalone, userAgentString };
}
