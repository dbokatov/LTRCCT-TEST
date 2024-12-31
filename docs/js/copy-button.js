document.addEventListener("DOMContentLoaded", function() {
    const copyButtons = document.querySelectorAll(".copy-button");
    copyButtons.forEach(button => {
        button.addEventListener("click", function() {
            const textToCopy = button.getAttribute("data-copy-text");
            navigator.clipboard.writeText(textToCopy).then(() => {
                console.log("Text copied to clipboard");
            }).catch(err => {
                console.error("Could not copy text: ", err);
            });
        });
    });
});
