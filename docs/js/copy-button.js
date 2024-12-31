document.addEventListener("DOMContentLoaded", function() {
    const copyIcons = document.querySelectorAll(".copy");
    copyIcons.forEach(icon => {
        icon.addEventListener("click", function() {
            const textToCopy = icon.getAttribute("data-copy-text");
            navigator.clipboard.writeText(textToCopy).then(() => {
                console.log("Text copied to clipboard");
            }).catch(err => {
                console.error("Could not copy text: ", err);
            });
        });
    });
});
