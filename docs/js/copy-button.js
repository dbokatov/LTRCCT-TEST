document.addEventListener("DOMContentLoaded", function() {
    const copyElements = document.querySelectorAll(".copy");

    copyElements.forEach(copyElement => {
        const attendeeElement = copyElement.querySelector(".attendee_out");
        if (attendeeElement) {
            const attendeeID = attendeeElement.textContent || attendeeElement.innerText;
            const currentText = copyElement.getAttribute("data-copy-text");
            copyElement.setAttribute("data-copy-text", currentText + attendeeID);
        }

        copyElement.addEventListener("click", function() {
            const textToCopy = copyElement.getAttribute("data-copy-text");
            navigator.clipboard.writeText(textToCopy).then(() => {
                console.log("Text copied to clipboard");
            }).catch(err => {
                console.error("Could not copy text: ", err);
            });
        });
    });
});
