function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab contents
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove "active" class from all tab links
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab content and mark the tab link as active
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Show the "Home" tab by default
document.getElementById("home").style.display = "block";
document.getElementsByClassName("tablinks")[0].className += " active";

