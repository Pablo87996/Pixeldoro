var buttonBible = document.getElementById('button-bible');
var versiculo = document.getElementById('versiculo');
var buttonClose2 = document.getElementById('button-close-2');
var blur = document.getElementById('blur');
var areaVersiculo1 = document.getElementById('area-versiculo-1');
var areaVersiculo2 = document.getElementById('area-versiculo-2');
var responsiveVersiculo = document.getElementById('responsive-versiculo');
var randomNumber = 0;

buttonBible.onclick = function() {
    blur.classList.toggle('active');
    versiculo.classList.toggle('active');
    //randomNumber = Math.floor(Math.random() * 5);
    //randomVersiculo();
}

responsiveVersiculo.onclick = function() {
    blur.classList.toggle('active');
    versiculo.classList.toggle('active');
    //randomNumber = Math.floor(Math.random() * 5);
    //randomVersiculo();
}

buttonClose2.onclick = function() {
    blur.classList.toggle('active');
    versiculo.classList.toggle('active');
}

/*function randomVersiculo() {
    if(randomNumber == 0) {
        areaVersiculo1.innerHTML = "O temor do Senhor é o princípio do saber, mas os loucos desprezam a sabedoria e o ensino.";
        areaVersiculo2.innerHTML = "Provérbios 1:7";
    } else if(randomNumber == 1) {
        areaVersiculo1.innerHTML = "Mas o que me der ouvidos habitará seguro, tranquilo e sem temor do mal.";
        areaVersiculo2.innerHTML = "Provérbios 1:33";
    } else if(randomNumber == 2) {
        areaVersiculo1.innerHTML = "Porque os retos habitarão a terra, e os integros permanecerão nela.";
        areaVersiculo2.innerHTML = "Provérbios 2:21";
    } else if(randomNumber == 3) {
        areaVersiculo1.innerHTML = "Filho meu, não te esqueças dos meus ensinamentos, e o teu coração guarde os meus mandamentos; porque eles aumentarão os teus dias e te acrescentarão anos de vida e paz.";
        areaVersiculo2.innerHTML = "Provérbios 3:1-2";
    } else if(randomNumber == 4) {
        areaVersiculo1.innerHTML = "Mas a vereda dos justos é como a luz da aurora, que vai brilhando mais e mais até ser dia perfeito.";
        areaVersiculo2.innerHTML = "Provérbios 4:18";
    }
}*/

fetch('https://www.abibliadigital.com.br/api/verses/nvi/:abbrev/random')
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
