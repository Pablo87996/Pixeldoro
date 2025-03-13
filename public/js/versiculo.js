const responsiveVersiculo = document.getElementById('responsive-versiculo');
const versiculoPopUp = document.getElementById('versiculo-pop-up');
const versiculo = document.getElementById('versiculo');
var buttonClose2 = document.getElementById('button-close-2');
var areaVersiculo1 = document.getElementById('area-versiculo-1');
var areaVersiculo2 = document.getElementById('area-versiculo-2');
let verseLoaded = 0;

versiculo.onclick = function () {
    if(verseLoaded === 0) {
        loadVerse();
    }

    blur.classList.toggle('active');
    versiculoPopUp.classList.toggle('active');
}

buttonClose2.onclick = function () {
    blur.classList.toggle('active');
    versiculoPopUp.classList.toggle('active');
}

responsiveVersiculo.onclick = function () {
    if(verseLoaded === 0) {
        loadVerse();
    }
    
    closeNav();

    versiculoPopUp.classList.toggle('active');
    blur.classList.toggle('active');
}

function loadVerse() {
    if (localStorage.getItem('language') == null) {
        localStorage.setItem('language', 'en');
    } else {
        let language = localStorage.getItem('language');
        let version;
    
        if (language == 'en') {
            version = 'bbe';
        } else {
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
    
                verseLoaded = 1;
            })
    }
}
