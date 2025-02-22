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

    // Função para abrir o modal de visualização
    function openBookModal(title, author, description, cover) {
        // Atualizar o modal com as informações do livro
        document.getElementById("modalBookCover").src = cover;
        document.getElementById("modalBookTitle").innerText = title;
        document.getElementById("modalBookAuthor").innerText = author;
        document.getElementById("modalBookDescription").innerText = description;

        // Exibir modal
        viewBookModal.showModal();
    }

    // Adicionar eventos de clique aos links dos livros
    bookLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Evita recarregar a página

            console.log("Clicou em um livro!");

            // Capturar os dados do livro dos atributos `data-*`
            const title = link.getAttribute("data-title");
            const author = link.getAttribute("data-author");
            const description = link.getAttribute("data-description");
            const cover = link.getAttribute("data-cover");

            // Abrir o modal de visualização
            openBookModal(title, author, description, cover);
        });
    });

    // Fechar modal ao clicar no botão "X"
    closeBookModalBtn.addEventListener("click", () => {
        console.log("Fechando modal do livro...");
        viewBookModal.close();
    });

    // Fechar modal ao clicar fora dele
    viewBookModal.addEventListener("click", (event) => {
        if (event.target === viewBookModal) {
            console.log("Clicou fora do modal. Fechando...");
            viewBookModal.close();
        }
    });
});