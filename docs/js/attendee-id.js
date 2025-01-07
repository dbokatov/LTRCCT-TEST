document.addEventListener('DOMContentLoaded', function() {
    const attendeeID = localStorage.getItem('attendeeID') || 'Not Set';
    const attendeePlaceholder = document.getElementById('attendee-id-placeholder');

    if (attendeePlaceholder) {
        attendeePlaceholder.textContent = attendeeID;
    }
});
