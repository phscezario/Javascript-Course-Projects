/**
 * Plugin criado por:
 * Paulo Cezario
 * https://github.com/ByakkoKa
 **/
 (function() {
    let isLgView = Boolean(document.body.clientWidth <= 1028);
    let isMdView = Boolean(document.body.clientWidth <= 768);
    let isSmView = Boolean(document.body.clientWidth <= 414);

    document.querySelectorAll('.my-slider-gallery').forEach( gallery => {
        let resizeTimeout;
        
        // Adiciona controladores
        gallery.innerHTML += `<div class="left"><span>‹</span></div>\n<div class="right"><span>›</span></div>\n<div class="dots"></div>`;
        
        const data = getData(gallery);

        const container = gallery.querySelector('.container');
        const children = container.querySelectorAll('.item');
        const left = gallery.querySelector('.left');
        const right = gallery.querySelector('.right');
        const dots = gallery.querySelector('.dots');

        widthVerify(gallery, container, children,  dots, data, true);
        
        // Adiciona Listeners
        left.addEventListener('click', () => {
            moveLeft(gallery, container, dots, data );
        });
        right.addEventListener('click', () => {
            moveRight(gallery, container, dots, data );
        });  

        moveSlider(gallery, container, dots, data.spacing);

        // Auto Play 
        if (data.auto == 'yes') {
            if (gallery.getAttribute('data-time') == null) gallery.setAttribute('data-time', '10');
            autoPlay(gallery, container, dots, data );
        }

        window.addEventListener('resize', () => {
            if (!resizeTimeout) {
                resizeTimeout = setTimeout(() => {
                  resizeTimeout = null;
                  resizeWindow(gallery, container, children, dots, data);
                 }, 1000);
              }
        });
    });

    function getData(gallery) {
        const data  = {
            width: parseFloat(gallery.scrollWidth),
            height: gallery.getAttribute('data-height'),
            show: Number(gallery.getAttribute('data-show')),
            spacing: parseFloat(gallery.getAttribute('data-spacing')),
            auto: gallery.getAttribute('data-autoplay'),
            childrenWidth: null,
            totalWidth: gallery.offsetWidth,   
            monitorShow: gallery.getAttribute('data-lg-show'),
            monitorSpacing: gallery.getAttribute('data-lg-spacing'),
            monitorHeight: gallery.getAttribute('data-lg-height'),
            tabletShow: gallery.getAttribute('data-md-show'),
            tabletSpacing: gallery.getAttribute('data-md-spacing'),
            tabletHeight: gallery.getAttribute('data-md-height'),
            mobileShow: gallery.getAttribute('data-sm-show'),
            mobileSpacing: gallery.getAttribute('data-sm-spacing'),
            mobileHeight:  gallery.getAttribute('data-sm-height')
        };
        return setData(data);
    }

    function setData(data) {
        if (data.show == 0) data.show = 8;

        if (data.height == null) data.height = children[0].style.height;

        if (isSmView) {
            if (data.mobileHeight != null) data.height = Number(data.mobileHeight);

            if (data.mobileSpacing != null) data.spacing =  Number(data.mobileSpacing);

            if (data.mobileShow != null) data.show = Number(data.mobileShow);
            else data.show = 2;

        } 
        else if (isMdView) {
            if (data.tabletHeight != null) data.height = Number(data.tabletHeight);

            if (data.tabletSpacing != null) data.spacing =  Number(data.tabletSpacing);

            if (data.tabletShow != null) data.show = Number(data.tabletShow);
            else data.show = 4;            
        }
        else if (isLgView) {
            if (data.monitorHeight != null) data.height = Number(data.monitorHeight);

            if (data.monitorSpacing != null) data.spacing =  Number(data.monitorSpacing);

            if (data.monitorShow != null) data.show = Number(data.monitorShow);
            else data.show = 6;
        }

        return data;
    }

    // Eventos
    function moveLeft(gallery, container, dots, data) {
        if (container.scrollLeft == 0) container.scrollLeft = data.totalWidth;
        else container.scrollLeft -= data.childrenWidth + data.spacing;        

        verifyActiveDot(gallery, container, dots, data.spacing);

        
        if (data.auto == 'yes') {
            autoPlay(gallery, container, dots, data);
        }
    }

    function moveRight(gallery, container, dots, data) {
        if ((container.scrollLeft + gallery.scrollWidth) + (data.spacing * 2) >= container.scrollWidth) container.scrollLeft = 0;        
        else container.scrollLeft += data.childrenWidth + data.spacing;        

        verifyActiveDot(gallery, container, dots, data.spacing);

        if (data.auto == 'yes') {
            autoPlay(gallery, container, dots, data);
        }
    }
    
    function widthVerify(gallery, container, children,  dots, data, firstTime = false) {        
        if (isNaN(data.spacing)) data.spacing = (data.width / data.show) / (data.show / 2);

        data.childrenWidth = Math.floor((data.width / data.show) + (data.spacing / data.show) - data.spacing);
        data.totalWidth = (Number(data.childrenWidth) + data.spacing) * children.length - data.spacing;

        children.forEach( e => {
            e.style.height = `${data.height}px`;
            e.style.width = `${data.childrenWidth}px`;
            e.style.marginRight = `${data.spacing}px`;

            if (firstTime) {
                e.addEventListener('selectstart', preventEvent); 
                e.addEventListener('dragstart', preventEvent);
            }
        });

        addDots(gallery, container, dots, data)
    }

    function addDots(gallery, container, dots, data){
        let dotNum = data.totalWidth / data.width;
        
        if (dotNum > 1){
            let i;
            let position = 0 - data.spacing;

            for(i = 1; i < dotNum; i++){
                dots.innerHTML += `<div rel="${i}" data-location="${position}"></div>`;
                position += (data.width - i); 
            }
            if (data.totalWidth - position > data.childrenWidth){
                dots.innerHTML += `<div rel="${i}" data-location="${position}"></div>`;
            }

            dots.style.marginLeft = `-${dots.scrollWidth / 2}px`;
            container.scrollLeft = 0;
            dots.childNodes[0].classList.add('active');

            dots.querySelectorAll('div').forEach( element => {
                element.addEventListener('click', () => {
                    verifyActiveDot(gallery, container, dots, data.spacing, element);
                });
            });
        }
    }

    function autoPlay(gallery, container, dots, data){
        if (!gallery.isChanging) {
            clearTimeout(gallery.galleryAutoPlay);
            
            gallery.addEventListener('mouseover', () => {
                clearTimeout(gallery.galleryAutoPlay);
            });

            gallery.galleryAutoPlay =  setTimeout(() => {
                return  moveRight(gallery, container, dots, data);
            }, Number(gallery.getAttribute('data-time')) * 1000);

            gallery.addEventListener('mouseleave', () => {
                gallery.galleryAutoPlay =  setTimeout(() => {
                    return  moveRight(gallery, container, dots, data);
                }, Number(gallery.getAttribute('data-time')) * 1000);
            });

            gallery.isChanging = true;    

            setTimeout(() => {
            gallery.isChanging = false;
            }, 500); 
        }
    }

    // Mouse slider
    function moveSlider(gallery, container, dots, spacing) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let items = container.querySelectorAll('.item');

        let preventClick = e => {
            // Impede que links funcionem se mouse estiver em movimento
            if (startX != e.pageX - container.offsetLeft) {
                items.forEach(el => {
                    el.querySelectorAll('a').forEach(e => {
                        e.addEventListener('click', preventEvent);
                    });
                })

                // Executa o SNAP que da erro apenas com CSS em todos navegadores
                for(let i = 0; i <= items.length; i++){
                    let width = items[0].scrollWidth;
                    let position = ((width * (i + 1)) + (width / 2)) + (Number(spacing * (i + 1)));
                    
                    if (container.scrollLeft < (width / 2) + Number(spacing / 2)) {
                        container.scrollLeft = 0;
                        break;
                    }
                    if (container.scrollLeft < position + Number(spacing / 2)) {
                        container.scrollLeft = position - (width / 2);
                        break;
                    }
                }
            }
            else {
                items.forEach(el => {
                el.querySelectorAll('a').forEach(e => {
                    e.removeEventListener('click', preventEvent);
                    });
                });
            }
        }
   
        container.addEventListener('mousedown', e => {
            isDown = true;
            container.classList.add('slider');
            startX = e.pageX - container.offsetLeft; // Define local do click no eixo X
            scrollLeft = container.scrollLeft;      // Define o local do scroll              
        });
        container.addEventListener('mouseup', e => {
            isDown = false;
            container.classList.remove('slider');   
            items[0].style.marginLeft = '0px';
            items[items.length - 1].style.marginRight = '0px';  
            
            preventClick(e);
        });

        container.addEventListener('mousemove', e => {
            if (!isDown) return; // Parar de executar se for false
            e.preventDefault();
            const x = e.pageX - container.offsetLeft; // Define local onde click foi solto
            const walk = (x - startX);              // Distancia a percorrer, aumentar a velocidade com * N
            container.scrollLeft = scrollLeft - walk; // Movimenta scroll do elemento
            
            if (container.scrollLeft == 0 && startX < x) {
            items[0].style.marginLeft = '20px';
            }
            if (container.scrollLeft == container.scrollWidth - container.clientWidth && startX > x){
                items[items.length - 1].style.marginRight = '20px';
            }

            verifyActiveDot(container, container, dots, spacing); 
        });

        container.addEventListener('touchstart', e => {
            isDown = true;
            container.classList.add('slider');
            startX = e.changedTouches[0].pageX - container.offsetLeft; // Define local do click no eixo X
            scrollLeft = container.scrollLeft;                        // Define a local do scroll 
            
        });
        container.addEventListener('touchend', e => {
            isDown = false;
            container.classList.remove('slider');   
            items[0].style.marginLeft = '0px';
            items[items.length - 1].style.marginRight = '0px';

            preventClick(e);
        });
        container.addEventListener('touchmove', e => {
            if (!isDown) return; // Parar de executar se for false
            e.preventDefault();
            const x = e.changedTouches[0].pageX - container.offsetLeft; // Define local onde click foi solto
            container.scrollLeft = scrollLeft - (x - startX);         // Movimenta scroll do elemento
            
            if (container.scrollLeft == 0 && startX < x) {
            items[0].style.marginLeft = '20px';
            }
            if (container.scrollLeft == container.scrollWidth - container.clientWidth && startX > x){
                items[items.length - 1].style.marginRight = '20px';
            }

            verifyActiveDot(gallery, container, dots, spacing); 
        });               
    }

    //Verificar dots que vai "acender"
    function  verifyActiveDot(gallery, container, items, spacing, element){
        let last = false;
        let pass = false;
        setTimeout( () => { 
            items.childNodes.forEach(e => {
                let location = Number(e.getAttribute('data-location'));            
                let index = Number(e.getAttribute('rel'));

                if (element != null){
                    let elLoc = Number(element.getAttribute('data-location'));
                    element.classList.add('active');
                    if (elLoc == location) container.scrollLeft = elLoc + (spacing * index);
                    else e.classList.remove('active');
                }
                else {
                    if (!pass && (container.scrollLeft + gallery.scrollWidth) + (spacing * 2) >= container.scrollWidth){  
                        e.classList.remove('active')
                        last = true;
                        pass = true;
                    }
                    else if (!pass && container.scrollLeft <= (gallery.scrollWidth * index) && container.scrollLeft >= location){
                        e.classList.add('active'); 
                        pass = true;                    
                    }
                    else {
                        if (last && index == items.childNodes.length){
                            items.childNodes[items.childNodes.length - 1].classList.add('active'); 
                        }
                        else e.classList.remove('active');                    
                    }
                }
            });
        }, 200);
    }
   
    function resizeWindow(gallery, container, children, dots) {
        isLgView = Boolean(document.body.clientWidth <= 1028);
        isMdView = Boolean(document.body.clientWidth <= 768);
        isSmView = Boolean(document.body.clientWidth <= 414);

        dots.innerHTML = '';
        widthVerify(gallery, container, children,  dots, getData(gallery));
        container.style.height = `${getData(gallery).height}px`;
    }

    // O método preventDefault foi colocado em um função para ser removido facilmente
    function preventEvent(element){    
        element.preventDefault();
    }
})();