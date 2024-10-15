import React, { useEffect, useState } from 'react';

export default function InstallPWAButton() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);

    useEffect(() => {
        // Check if the app is running in standalone mode (PWA already installed)
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInStandaloneMode(true);
        }

        // Detect iOS
        const userAgent = window.navigator.userAgent;
        const isIOSDevice = /iPhone|iPad|iPod/i.test(userAgent);
        setIsIOS(isIOSDevice);

        // Listen for the `beforeinstallprompt` event (for Android & Desktop)
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault(); // Prevent the default prompt from showing
            setDeferredPrompt(e); // Save the event for triggering later
            setIsInstallable(true); // Show install button
        });
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Show the install prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                setDeferredPrompt(null); // Clear the deferred prompt
            });
        }
    };

    const renderIOSInstallInstructions = () => (
        <div>
            <p>To install this app on your iOS device:</p>
            <ol>
                <li>Tap the share icon in Safari.</li>
                <li>Select "Add to Home Screen".</li>
            </ol>
        </div>
    );

    if (isInStandaloneMode) {
        return null; // Don't show install button if app is already installed
    }

    return (
        <div>
            {isInstallable && !isIOS && (
                <button className='p-2 bg-orange-500 text-orange-100 rounded hover:bg-orange-600 hover:text-orange-200 text-sm font-bold ' onClick={handleInstallClick}>Install App</button>
            )}

            {isIOS && !isInStandaloneMode && renderIOSInstallInstructions()}
        </div>
    );
}
