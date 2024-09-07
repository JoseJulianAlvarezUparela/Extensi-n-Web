document.addEventListener('DOMContentLoaded', function () {
    const scanButton = document.getElementById('scanButton');
    const statusText = document.getElementById('status');
    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('resultText');
    const detailsButton = document.getElementById('detailsButton');

    // Función para enviar un mensaje al background script
    function scanUrl() {
        chrome.runtime.sendMessage({ action: 'scanUrl' }, function (response) {
            // Maneja la respuesta del background script
            if (response && response.result) {
                let resultMessage;
                let resultClass;

                // Determina el mensaje y la clase basado en el resultado
                if (response.result === 'safe') {
                    resultMessage = 'El sitio es seguro.';
                    resultClass = 'safe';
                } else if (response.result === 'warning') {
                    resultMessage = 'El sitio es dudoso.';
                    resultClass = 'warning';
                } else if (response.result === 'danger') {
                    resultMessage = 'El sitio es peligroso.';
                    resultClass = 'danger';
                } else {
                    resultMessage = 'No se pudo determinar el estado.';
                    resultClass = 'unknown';
                }

                // Actualiza la interfaz con el resultado
                statusText.textContent = 'Estado: Escaneo Completo';
                resultText.textContent = resultMessage;
                scanButton.classList.add(resultClass);
                resultDiv.classList.remove('hidden');
            } else {
                statusText.textContent = 'Estado: Error en el escaneo';
                resultText.textContent = 'No se pudo obtener el resultado.';
                scanButton.classList.add('error');
                resultDiv.classList.remove('hidden');
            }
            scanButton.disabled = false;
        });
    }

    // Maneja el clic en el botón de escaneo
    scanButton.addEventListener('click', function () {
        statusText.textContent = 'Estado: Escaneando...';
        scanButton.disabled = true;
        scanButton.className = ''; // Resetea las clases del botón
        scanUrl(); // Llama a la función para iniciar el escaneo
    });

    // Maneja el clic en el botón de detalles
    detailsButton.addEventListener('click', function () {
        alert('Mostrar más detalles...');
    });
});
