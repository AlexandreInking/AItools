document.addEventListener('DOMContentLoaded', function() {
    const countButton = document.getElementById('countButton');
    const inputText = document.getElementById('inputText');
    const wordCount = document.getElementById('wordCount');
    const paragraphCount = document.getElementById('paragraphCount');
    const charCount = document.getElementById('charCount');
    const charCountNoSpaces = document.getElementById('charCountNoSpaces');

    countButton.addEventListener('click', function() {
        if (window.pywebview) {
            window.pywebview.api.get_word_count(inputText.value).then(updateResults);
        }
    });

    function updateResults(results) {
        wordCount.textContent = results.words;
        paragraphCount.textContent = results.paragraphs;
        charCount.textContent = results.characters;
        charCountNoSpaces.textContent = results.characters_no_spaces;
    }
});