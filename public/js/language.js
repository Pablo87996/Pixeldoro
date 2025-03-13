const en = document.querySelectorAll('.en');
const ptBR = document.querySelectorAll('.pt-br');
const defaultLanguage = document.querySelectorAll('#default-language');

let href = window.location.href;
let lastElement = href.split('/')[href.split('/').length-1];
let link;

if(localStorage.getItem('defaultLanguage') == 0 || localStorage.getItem('defaultLanguage') == null){
    if(href.includes('pt-br')){
        localStorage.setItem('language', 'pt-br');
    }else{
        localStorage.setItem('language', 'en');
    }
}

if(localStorage.getItem('defaultLanguage') == null){
    localStorage.setItem('defaultLanguage', 0); 
}else{
    if(localStorage.getItem('defaultLanguage') == 1){
        update();
    }
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

defaultLanguage.forEach((element) => {
    element.onclick = () => {
        if(element.checked == true){
            localStorage.setItem('defaultLanguage', 1);
        }else{
            localStorage.setItem('defaultLanguage', 0);
        }
    }

    if(localStorage.getItem('defaultLanguage') == 0){
        element.checked = false;
    }else{
        element.checked = true;
    }
});

function update() {
    if(localStorage.getItem('language') == 'en' && href.includes('pt-br')){
        link = href.replace(/pt-br\/?/, '');
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
