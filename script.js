const viewMeal = document.getElementById("viewMeal");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content")
const closeBtn = document.getElementById("close");

viewMeal.addEventListener('click', onViewMealClick);
closeBtn.addEventListener('click', closeModal);

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
        modal.style.transition = `all 0.45s linear`;
        modal.style.backgroundColor= `rgba(0,0,0,0.9)`;
    });
}

async function onViewMealClick(e) {

    const viewMealCard = e.currentTarget;
    const viewMealCardClone = viewMealCard.cloneNode(true);
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

    viewMealCardClone.style.display = 'block'
    viewMealCardClone.style.padding = '0'
    viewMealCardClone.style.overflow = 'hidden'
    viewMealCardClone.appendChild(modalContent)
    await toggleExpansion(viewMealCardClone, {top: `${100}px`, left: `${0}px`, width: `${width + 56}px`, height:`${93}%`}, '0.7s')
}

function closeModal(){
    modal.style.display="none";
};