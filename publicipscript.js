document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById('testButton');
    button.addEventListener('click', function() {
        button.style.display = 'none'; // Hide the button when clicked
        document.getElementById('ipTable').style.display = 'table'; // Show the table
        fetchIP();
    });
});

function fetchIP() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ipv4').innerText = data.ip;
        })
        .catch(error => {
            document.getElementById('ipv4').innerText = 'Failed to fetch IPv4 address.';
        });

    fetch('https://ipinfo.io/json?token=bac5f539d4208e')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ipv6').innerText = data.ip;
            document.getElementById('location').innerText = `${data.city}, ${data.region} ${data.country}`;
            document.getElementById('isp').innerText = data.org;
            
            // Change background color of the table to blue
            document.getElementById('ipTable').style.backgroundColor = 'blue';
        })
        .catch(error => {
            document.getElementById('ipv6').innerText = 'IPv6 address not available.';
            document.getElementById('location').innerText = 'Location data unavailable.';
            document.getElementById('isp').innerText = 'ISP data unavailable.';
        });
}

