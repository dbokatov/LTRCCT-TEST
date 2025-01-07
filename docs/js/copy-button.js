document.addEventListener('DOMContentLoaded', function() {
        const attendeeID = localStorage.getItem('attendeeID') || 'Not Set';
        const containers = document.querySelectorAll('.attendee-id-container');

        containers.forEach(function(container) {
            const placeholder = container.querySelector('.attendee-id-placeholder');
            if (placeholder) {
                placeholder.textContent = attendeeID;
            }

            // Update the data-copy-text attribute
            container.setAttribute('data-copy-text', `admin_ID${attendeeID}`);

            // Add click event to copy the text
            container.addEventListener('click', function() {
                const textToCopy = container.getAttribute('data-copy-text');
                navigator.clipboard.writeText(textToCopy).then(() => {
                    console.log("Text copied to clipboard");
                }).catch(err => {
                    console.error("Could not copy text: ", err);
                });
            });
        });
    });
