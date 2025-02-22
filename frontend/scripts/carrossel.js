let counter = 1;

function autoSlide() {
    document.getElementById("radio" + counter).checked = true;
    counter++;

    if (counter > 3) {
        counter = 1;
    }
}

setInterval(autoSlide, 5000); // Troca a cada 5 segundos