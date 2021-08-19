window.onload = function(){

    const main = document.querySelector('#main-exhibition');
    const title = document.querySelector('#main-exhibition .title');
    const description = document.querySelector('#main-exhibition .description');
    const playBt = document.querySelector('#play');
    const moreInfos = document.querySelector('#more-infos');
    const infosContainer = document.querySelector('#infos-container');

    let items = document.querySelectorAll('.selector');

    items.forEach( e => {
        let startX;
        let endX;

        e.addEventListener('mousedown', el => {
            startX = el.pageX;
        });
        
        e.addEventListener('mouseup', el => {
            endX = el.pageX;
            if((startX - endX) < 10 && (startX - endX) > -10) {
                main.style.backgroundImage = `url(${e.querySelector('img').getAttribute('src')})`;
                title.innerHTML = e.querySelector('img').getAttribute('alt');
                description.innerHTML = e.querySelector('img').getAttribute('data-description');
                slideUpElement(infosContainer);
            }            
        });
    });

    playBt.addEventListener('click', () => {
        alert('Hello, this button will be to start reading...');
    });

    moreInfos.addEventListener('click', () => {      
        infosContainer.innerHTML = '';
        let list = document.createElement('ul');

        list.innerHTML += `<li><strong>Title:</strong> ${title.innerHTML}</li>`;
        list.innerHTML += `<li><strong>Description:</strong> ${description.innerHTML}</li>`;
        list.innerHTML += `<li><strong>Page number:</strong> ...</li>`;
        list.innerHTML += `<li><strong>Last read:</strong> 01/01/21</li>`;

        infosContainer.appendChild(list);   
        slideDownElement(infosContainer);  
    });

    function slideDownElement(e) {
        e.style.height = `${e.scrollHeight}px`;
    }

    function slideUpElement(e) {
        e.style.height = '0px';
        e.innerHTML = '';      
    }
}