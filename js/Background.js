const VIRUSTOTAL_API_URL = "https://www.virustotal.com/api/v3/urls";
const API_KEY = "5d9bbcb5a00e670fb259d7ae1df882d8d35cae15bcc4878eb1dbb7d25b31412b"; 

// Codifica la URL en Base64 para la API de VirusTotal
function encodeBase64Url(url) {
    return btoa(url).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

// Consulta la API de VirusTotal
async function checkUrlWithVirusTotal(url) {
    const encodedUrl = encodeBase64Url(url);
    try {
        const response = await fetch(`${VIRUSTOTAL_API_URL}/${encodedUrl}`, {
            method: 'GET',
            headers: {
                'x-apikey': API_KEY
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data.data.attributes.last_analysis_stats;
        } else {
            throw new Error('Error al consultar la API de VirusTotal');
        }
    } catch (error) {
        console.error('Error en la consulta a la API de VirusTotal:', error);
        throw error;
    }
}

// Escucha los mensajes enviados desde popup.js
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "scanUrl") {
        const currentTab = await chrome.tabs.query({ active: true, currentWindow: true });
        const url = currentTab[0].url;

        try {
            const analysisStats = await checkUrlWithVirusTotal(url);
            const { malicious, suspicious } = analysisStats;

            let result;
            if (malicious > 0) {
                result = 'danger';    // Sitio peligroso
            } else if (suspicious > 0) {
                result = 'warning';   // Sitio dudoso
            } else {
                result = 'safe';      // Sitio seguro
            }

            // Responder al popup.js con el resultado
            sendResponse({ result: result });
        } catch (error) {
            sendResponse({ result: 'error' }); // En caso de error, se envía un estado de error
        }

        // Indica que la respuesta será enviada de forma asíncrona
        return true;
    }
});
