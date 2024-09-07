
function sendPageUrlToBackground() {
    chrome.runtime.sendMessage({ action: 'getUrl', url: window.location.href });
}

// Llama a la función cuando el script se inyecta en la página
sendPageUrlToBackground();
