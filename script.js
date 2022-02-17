document.getElementById("viewMeal").addEventListener('click', onViewMealClick);
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content")

async function onViewMealClick(e) {
    const viewMealCard = e.currentTarget;
    const viewMealCardClone = viewMealCard.cloneNode(true);
    const modalContentClone = modalContent.cloneNode(true);
    const rect = viewMealCard.getBoundingClientRect();
    const top = rect.top;
    const left = rect.left;
    const width = rect.width;
    const height = rect.height;

    viewMealCardClone.style.position = 'absolute';
    viewMealCardClone.style.top =  197 + 'px';
    viewMealCardClone.style.left = 28 + 'px';
    viewMealCardClone.style.width = width + 'px';
    viewMealCardClone.style.height = height+ 'px';
    viewMealCardClone.style.zIndex = 10;

    viewMealCard.style.opacity = '0';
    viewMealCard.parentNode.appendChild(viewMealCardClone);

    openModal();
    fadeContent(viewMealCardClone, 1000)
        viewMealCardClone.children[0].children[1].addEventListener('click', async () => {
        viewMealCardClone.style.removeProperty('display');
        viewMealCardClone.style.removeProperty('padding');
        viewMealCard.style.removeProperty('opacity');
        fadeClone(viewMealCardClone, '0');
        closeModal()
        await toggleExpansion(viewMealCardClone, {top: `${200}px`, left: `${28}px`, width: `${width}px`, height: `${height}px`}, '0.7s')
        viewMealCardClone.remove();
    })

    viewMealCardClone.style.display = 'block'
    viewMealCardClone.style.padding = '0'
    viewMealCardClone.style.overflow = 'hidden'
    viewMealCardClone.appendChild(modalContentClone)
    toggleExpansion(viewMealCardClone, {top: `${120}px`, left: `${0}px`, width: `${width + 56}px`, height:`${89}%`}, '0.7s')
}

function toggleExpansion(element, to, duration) {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            element.style.transition = `
            width ${duration} ease-in-out,
            height ${duration} ease-in-out,
            left ${duration} ease-in-out,
            top ${duration} ease-in-out
            `;
    
            element.style.top = to.top;
            element.style.left = to.left;
            element.style.width = to.width;
            element.style.height = to.height;
        });
        
        setTimeout(resolve, 1000)
    });
};

function fadeContent(element, duration){
    return new Promise((res) => {
        requestAnimationFrame(() => {
            const title = element.children[0].children[0];
            title.style.transition = `all ${duration}ms ease-in-out`;
            title.className = 'modal-text'
            title.innerText = "Todays's Meals"

            const close = element.children[0].children[1];
            close.style.transition = `all ${duration}ms ease-in-out`;
            close.className = 'close'
            close.innerHTML = `<img class="close-icon" src="img/close.png" alt="icon">`
        });
        setTimeout(res, parseInt(duration));
    })
}

function openModal(){
    modal.style.display="flex";
    requestAnimationFrame(() => {
        modal.style.transition = `background-color 0.45s linear`;
        modal.style.backgroundColor= `rgba(0,0,0,0.9)`;
    });
}

function closeModal(){
    requestAnimationFrame(() => {
        modal.style.transition = `background-color 0.5s linear`;
        modal.style.backgroundColor= `rgba(0,0,0,0)`;
    });
    setTimeout(function(){modal.style.display="none"},500)
}

function fadeClone(element, opacity, duration = 1000){
    return new Promise(res => {
        requestAnimationFrame(() => {
            const title = element.children[0].children[0];
            title.style.transition = `
            opacity 1s ease-in-out,
            border-radius ${duration}ms ease-in-out`;
            title.className = 'meal'
            title.innerText = "View your meals for the week"
            title.style.opacity = opacity

            const close = element.children[0].children[1];
            close.style.transition = `
            opacity 1s ease-in-out,
            border-radius ${duration}ms ease-in-out`;
            close.className = 'view-meal'
            close.innerHTML = "Click'em"
            close.style.opacity = opacity
        });
        setTimeout(res, duration);
    })
}

