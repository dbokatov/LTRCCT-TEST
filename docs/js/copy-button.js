document.addEventListener('DOMContentLoaded', function() {
        const attendeeID = localStorage.getItem('attendeeID') || 'Not Set';
        const placeholders = document.querySelectorAll('.attendee-id-placeholder');

        placeholders.forEach(function(placeholder) {
            const prefix = placeholder.getAttribute('data-prefix') || '';
            const suffix = placeholder.getAttribute('data-suffix') || '';
            const fullText = `${prefix}${attendeeID}${suffix}`;

            // Update the placeholder text
            placeholder.textContent = fullText;

            // Optionally update data-copy-text if needed for copying the whole text
            placeholder.setAttribute('data-copy-text', fullText);

            // Add click event to copy the text
            placeholder.addEventListener('click', function() {
                navigator.clipboard.writeText(fullText).then(() => {
                    console.log("Text copied to clipboard");
                }).catch(err => {
                    console.error("Could not copy text: ", err);
                });
            });
        });
    });
