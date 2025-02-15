let counter = 1;

setInterval(() => {
    document.getElementById('slide' + counter).checked = true;
    counter++;

    if (counter > 3) {
        counter = 1;
    }
}, 4000); // Muda o slide a cada 4 segundos
