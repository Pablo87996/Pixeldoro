var responsiveBar = document.getElementById('responsive-bar');
var responsiveMenu = document.getElementById('responsive-menu');
var responsiveSettings = document.getElementById('responsive-settings');
var hr1 = document.getElementById('hr1');
var hr2 = document.getElementById('hr2');
var hr3 = document.getElementById('hr3');
var blur = document.getElementById('blur');
var popUp = document.getElementById('pop-up');

responsiveBar.onclick = function(){
    responsiveBar.classList.toggle('active');
    responsiveMenu.classList.toggle('active');
    hr1.classList.toggle('active');
    hr2.classList.toggle('active');
    hr3.classList.toggle('active');
}

responsiveSettings.onclick = function() {
    blur.classList.toggle('active');
    popUp.classList.toggle('active');   
}

