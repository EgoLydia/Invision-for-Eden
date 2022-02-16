const viewMeal = document.getElementById("viewMeal");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

viewMeal.addEventListener('click', openModal);
closeBtn.addEventListener ('click', closeModal);

function openModal(){
    modal.style.display="flex";
}

function closeModal(){
    modal.style.display="none";
};