document.addEventListener('DOMContentLoaded', function() {
    const summarizeButton = document.getElementById('summarizeButton');
    const inputText = document.getElementById('inputText');
    const summaryOutput = document.getElementById('summaryOutput');

    summarizeButton.addEventListener('click', function() {
        if (window.pywebview) {
            window.pywebview.api.summarize_text(inputText.value).then(displaySummary);
        }
    });

    function displaySummary(summary) {
        summaryOutput.textContent = summary;
    }
});