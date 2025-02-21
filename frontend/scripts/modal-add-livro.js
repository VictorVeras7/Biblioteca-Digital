document.addEventListener("DOMContentLoaded", () => {
    console.log("Script carregado!");

    // Referências aos elementos do modal
    const bookModal = document.getElementById("bookModal");
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.getElementById("closeModal");
    const bookCoverInput = document.getElementById("bookCover");
    const bookForm = document.getElementById("bookForm");

    if (!bookModal || !openModalBtn || !closeModalBtn) {
        console.error("Erro: Elementos do modal não encontrados!");
        return;
    }

    // Abrir modal ao clicar no botão "Adicionar Livro"
    openModalBtn.addEventListener("click", () => {
        console.log("Abrindo modal...");
        bookModal.showModal();
    });

    // Fechar modal ao clicar no botão "Cancelar"
    closeModalBtn.addEventListener("click", () => {
        console.log("Fechando modal...");
        bookModal.close();
    });

    // Função para exibir preview da capa do livro
    bookCoverInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                let imgPreview = document.getElementById("bookCoverPreview");
                if (!imgPreview) {
                    imgPreview = document.createElement("img");
                    imgPreview.id = "bookCoverPreview";
                    bookForm.insertBefore(imgPreview, bookForm.children[bookForm.children.length - 2]);
                }
                imgPreview.src = e.target.result;
                imgPreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

    // Evento para envio do formulário dentro do modal
    bookForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = document.getElementById("bookTitle").value;
        const author = document.getElementById("bookAuthor").value;
        const genre = document.getElementById("bookGenre").value;
        const description = document.getElementById("bookDescription").value;
        const file = document.getElementById("bookCover").files[0];

        // Criando FormData para envio da imagem e dados
        const formData = new FormData();
        formData.append("files", file);
        formData.append("data", JSON.stringify({
            titulo: title,
            autor: author,
            genero: genre,
            descricao: description
        }));

        try {
            const response = await fetch("http://localhost:1337/api/livros", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            console.log("Livro Adicionado:", result);

            alert("Livro adicionado com sucesso!");

            // Fechar modal após adicionar livro
            bookModal.close();
        } catch (error) {
            console.error("Erro ao adicionar livro:", error);
            alert("Erro ao adicionar o livro.");
        }
    });
});
