// Progressive Enhancement
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);

        return registration.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function (subscription) {
            console.log('Push subscription endpoint:', subscription.endpoint);
        });
    }).catch(function (err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}

function notify(message) {
    if ('Notification' in window) {
        Notification.requestPermission(function (permission) {
            if (permission === 'granted') {
                var notification = new Notification(message, {
                    body: 'Karlsruhe City Guide',
                    icon: '/assets/launcher-icon-3x.png'
                });
            }
        });
    } else {
        alert('This platform does not support notifications.');
    }
}

function navigate(target) {
    var contentArea = document.getElementById('content');
    contentArea.innerText = 'Loading…';

    fetch('content/' + target.replace(/\.\./g, '') + '.html')
        .then(function (response) {
            if (response.status !== 200) {
                throw new Error(response.status);
            }

            return response.text().then(function (text) {
                // Potentially hazardous, use sanitizer/real SPA framework.
                contentArea.innerHTML = text;
            });
        }).catch(function (err) {
            contentArea.innerText = 'Too bad! This did not work. Please retry later: ' + err.message;
        });
}

function updateHashLocation() {
    navigate(window.location.hash.substr(2));
}

window.addEventListener("hashchange", updateHashLocation);

if (!window.location.hash) {
    window.location.hash = '/home';
}

updateHashLocation();
