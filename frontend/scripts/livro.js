document.addEventListener("DOMContentLoaded", () => {
    console.log("Script do modal do livro carregado!");

    // Referências ao modal e elementos dentro dele
    const viewBookModal = document.getElementById("viewBookModal");
    const closeBookModalBtn = document.getElementById("closeBookModal");

    // Capturar todos os links que abrem o modal
    const bookLinks = document.querySelectorAll(".openBookModal");

    if (!viewBookModal || !closeBookModalBtn) {
        console.error("Erro: Elementos do modal não encontrados!");
        return;
    }

    bookLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Evita recarregar a página

            console.log("Clicou em um livro!");

            // Capturar os dados do livro dos atributos `data-*`
            const title = link.getAttribute("data-title");
            const author = link.getAttribute("data-author");
            const description = link.getAttribute("data-description");
            const cover = link.getAttribute("data-cover");

            // Atualizar o modal com as informações do livro
            document.getElementById("modalBookCover").src = cover;
            document.getElementById("modalBookTitle").innerText = title;
            document.getElementById("modalBookAuthor").innerText = author;
            document.getElementById("modalBookDescription").innerText = description;

            // Exibir modal
            viewBookModal.showModal();
            viewBookModal.style.visibility = "visible";
        });
    });

    // Fechar modal ao clicar no botão "X"
    closeBookModalBtn.addEventListener("click", () => {
        console.log("Fechando modal do livro...");
        viewBookModal.close();
        viewBookModal.style.visibility = "hidden";
    });

    // Fechar modal ao clicar fora dele
    viewBookModal.addEventListener("click", (event) => {
        if (event.target === viewBookModal) {
            viewBookModal.close();
            viewBookModal.style.visibility = "hidden";
        }
    });
});
