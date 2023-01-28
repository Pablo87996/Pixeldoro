var buttonBible = document.getElementById('button-bible');
const responsiveVersiculo = document.getElementById('responsive-versiculo');
const versiculoPopUp = document.getElementById('versiculo-pop-up');
const versiculo = document.getElementById('versiculo');
var buttonClose2 = document.getElementById('button-close-2');
var blur = document.getElementById('blur');
var areaVersiculo1 = document.getElementById('area-versiculo-1');
var areaVersiculo2 = document.getElementById('area-versiculo-2');
var randomNumber = 0;

versiculo.onclick = function() {
    blur.classList.toggle('active');
    versiculoPopUp.classList.toggle('active');
}

buttonClose2.onclick = function() {
    blur.classList.toggle('active');
    versiculoPopUp.classList.toggle('active');
}

responsiveVersiculo.onclick = function() {
    closeNav();

    versiculoPopUp.classList.toggle('active');
    blur.classList.toggle('active');
}

if(localStorage.getItem('language') == null){
    localStorage.setItem('language', 'en');
}else{
    let language = localStorage.getItem('language');
    let version;
    
    if(language == 'en'){
        version = 'bbe';
    }else{
        version = 'nvi';
    }

    fetch(`https://www.abibliadigital.com.br/api/verses/${version}/:abbrev/random`)
        .then(response => {
            return response.json();
        })
        .then(random => {
            texto = random.text;
            nome = random.book.name;
            capitulo = random.chapter;
            verso = random.number;
    
            areaVersiculo1.innerHTML = texto;
            areaVersiculo2.innerHTML = `${nome} ${capitulo}:${verso}`;
        })
}
