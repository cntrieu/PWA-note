const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;
// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    // Prevent default installation prompt to be displayed
    event.preventDefault();

    // Storing the event object in deferredPrompt vaariable
    deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // If deferredPrompt exists, show installation prompt to user
        deferredPrompt.prompt();

        const result = await deferredPrompt.userChoice;
        // Logging user's choice to console
        if (result.outcome === 'accepted') {
            console.log('User accepted');
        } else {
            console.log('User declined');
        }

        // deferredPrompt was used to hold the beforeinstallprompt event object. After user makes a choice, set to null so the installation prompt is not shown to user again after their choice
        deferredPrompt = null;

        // Assign back the hidden class to butInstall
        butInstall.classList.toggle('hidden', true);
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);

    // Resetting the deferredPrompt variable on global window object to 'null' so it does not interfere with any other parts of application
    window.deferredPrompt = null;
});
