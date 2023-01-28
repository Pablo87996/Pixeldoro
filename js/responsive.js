const responsiveSettings = document.getElementById('responsive-settings');
const settings = document.getElementById('settings');
var blur = document.getElementById('blur');
var popUp = document.getElementById('pop-up');

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);

    const dropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdown);
});

function closeNav(){
    var elem = document.querySelector('.sidenav');
    var instance = M.Sidenav.getInstance(elem);
    instance.close();
}

settings.onclick = function() {
    blur.classList.toggle('active');
    popUp.classList.toggle('active');
}

responsiveSettings.onclick = function() {
    closeNav();

    popUp.classList.toggle('active');
    blur.classList.toggle('active');
}
