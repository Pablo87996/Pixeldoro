const en = document.querySelectorAll('.en');
const ptBR = document.querySelectorAll('.pt-br');

let href = window.location.href;
let lastElement = href.split('/')[href.split('/').length-1];
let link;

if(localStorage.getItem('language') == null){
    localStorage.setItem('language', 'en');
}else{
    localStorage.getItem('language');
    update();
}

en.forEach((element) => {
    element.onclick = () => {
        localStorage.setItem('language', 'en');
        update();
    }
});

ptBR.forEach((element) => {
    element.onclick = () => {
        localStorage.setItem('language', 'pt-br');
        update();
    }
});

function update() {
    if(localStorage.getItem('language') == 'en' && href.includes('pt-br')){
        link = href.replace('pt-br/'+lastElement, '');
        window.location.href = link;
    }else if(localStorage.getItem('language') == 'pt-br' && !href.includes('pt-br')){
        if(lastElement == 'index.html'){
            link = href.replace('index.html', 'pt-br/');
        }else{
            link = href + 'pt-br/';
        }

        window.location.href = link;
    }
}
