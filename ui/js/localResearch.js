document.addEventListener('DOMContentLoaded', () => {
    const outputDiv = document.getElementById('output');

    if (window.pywebview) {
        startLocalResearch();
    }

    async function startLocalResearch() {
        if (window.pywebview) {
            //  ¡Usa for await...of para iterar sobre un generador asíncrono!
            for await (const update of window.pywebview.api.get_local_research_updates()) {
                const p = document.createElement('p');
                p.textContent = update;
                outputDiv.appendChild(p);
            }
        }
    }
});