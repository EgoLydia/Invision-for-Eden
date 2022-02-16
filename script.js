const viewMeal = document.getElementById("viewMeal");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

viewMeal.addEventListener('click', onViewMealClick);
closeBtn.addEventListener('click', closeModal);

function toggleExpansion(element, to, duration) {
    return new Promise(res => {
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
        
         setTimeout(res, duration)
    });
};

async function fadeContent(element, duration = 300){
    return new Promise(res => {
        [...element.children].forEach((child) => {
            requestAnimationFrame(() => {
                child.style.transition = `opacity ${duration}ms linear`;
                child.style.opacity = '0';
            });
        })
        setTimeout(res, duration);
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
    viewMealCardClone.style.top = top + 'px';
    viewMealCardClone.style.left = 28 + 'px';
    viewMealCardClone.style.width = width + 'px';
    viewMealCardClone.style.height = height+ 'px';
    viewMealCardClone.style.zIndex = 10;

    viewMealCard.style.opacity = '0';
    viewMealCard.parentNode.appendChild(viewMealCardClone);

    //fadeContent(viewMealCardClone);
    openModal();
    toggleExpansion(viewMealCardClone, {top: `${54}px`, left: `${0}px`, width: `${width + 56}px`, height:`${91}%`}, '0.7s');
    
}

function closeModal(){
    modal.style.display="none";
};