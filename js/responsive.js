// var responsiveBar = document.getElementById('responsive-bar');
// var responsiveMenu = document.getElementById('responsive-menu');
// var hr1 = document.getElementById('hr1');
// var hr2 = document.getElementById('hr2');
// var hr3 = document.getElementById('hr3');
const responsiveSettings = document.getElementById('responsive-settings');
const settings = document.getElementById('settings');
var blur = document.getElementById('blur');
var popUp = document.getElementById('pop-up');

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

// responsiveBar.onclick = function(){
//     responsiveBar.classList.toggle('active');
//     responsiveMenu.classList.toggle('active');
//     hr1.classList.toggle('active');
//     hr2.classList.toggle('active');
//     hr3.classList.toggle('active');
// }

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
