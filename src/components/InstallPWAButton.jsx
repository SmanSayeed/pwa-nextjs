import React, { useState, useEffect } from 'react';

export default function InstallPWAButton() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);
    const [showToast, setShowToast] = useState(false); // State for showing toast

    useEffect(() => {
        // Check if the app is running in standalone mode (PWA already installed)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        setIsInStandaloneMode(isStandalone);

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
                    showToastMessage(); // Show toast after installation
                } else {
                    console.log('User dismissed the install prompt');
                }
                setDeferredPrompt(null); // Clear the deferred prompt
            });
        }
    };

    const handleOpenAppClick = () => {
        // This can navigate to the app's home page if it's installed
        window.location.href = '/';
    };

    const showToastMessage = () => {
        setShowToast(true); // Show the toast
        setTimeout(() => {
            setShowToast(false); // Hide toast after 3 seconds
        }, 3000);
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

    return (
        <div>
            {/* Show Install button if app is not in standalone mode */}
            {isInstallable && !isInStandaloneMode && !isIOS && (
                <button
                    onClick={handleInstallClick}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                    Install App
                </button>
            )}

            {/* Show iOS install instructions */}
            {isIOS && !isInStandaloneMode && renderIOSInstallInstructions()}

            {/* Show Open App button if app is already installed */}
            {isInStandaloneMode && (
                <button
                    onClick={handleOpenAppClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                    Open App
                </button>
            )}

            {/* Toast message */}
            {showToast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-2 px-4 rounded shadow-lg">
                    App installed successfully!
                </div>
            )}
        </div>
    );
}
