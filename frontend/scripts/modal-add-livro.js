document.addEventListener("DOMContentLoaded", () => {
    console.log("Script de adicionar livro carregado!");

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

        const submitButton = bookForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";

        const title = document.getElementById("bookTitle").value;
        const author = document.getElementById("bookAuthor").value;
        const genre = document.getElementById("bookGenre").value;
        const description = document.getElementById("bookDescription").value;
        const file = document.getElementById("bookCover").files[0];

        // Primeiro, enviar a imagem (capa do livro)
        let coverId = null;
        if (file) {
            const formData = new FormData();
            formData.append("files", file);

            try {
                const uploadResponse = await fetch("http://localhost:1337/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const uploadResult = await uploadResponse.json();
                coverId = uploadResult[0].id; // ID da imagem enviada
            } catch (error) {
                console.error("Erro ao enviar a capa do livro:", error);
                alert("Erro ao enviar a capa do livro.");
                submitButton.disabled = false;
                submitButton.textContent = "Adicionar";
                return;
            }
        }

        // Agora, enviar os dados do livro
        try {
            const response = await fetch("http://localhost:1337/api/livros", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: {
                        titulo: title,
                        Autor: author, // Certifique-se de que o nome do campo está correto
                        Genero: genre,
                        Descricao: description,
                        Capa: coverId, // Certifique-se de que o nome do campo está correto
                    },
                }),
            });

            const result = await response.json();
            console.log("Livro Adicionado:", result);

            alert("Livro adicionado com sucesso!");

            // Preencher o modal de visualização com os dados do livro
            const viewBookModal = document.getElementById("viewBookModal");
            document.getElementById("modalBookTitle").textContent = title;
            document.getElementById("modalBookAuthor").textContent = author;
            document.getElementById("modalBookDescription").textContent = description;

            // Exibir a capa do livro (se houver)
            if (coverId) {
                const coverUrl = `http://localhost:1337/api/upload/files/${coverId}`;
                document.getElementById("modalBookCover").src = coverUrl;
            } else {
                document.getElementById("modalBookCover").src = "assets/modelo-geometrico-criativo-flyer-folheto.png"; // Imagem padrão
            }

            // Exibir o modal de visualização
            viewBookModal.showModal();

            // Fechar o modal de adição
            bookModal.close();

            // Limpar o formulário
            bookForm.reset();
            const imgPreview = document.getElementById("bookCoverPreview");
            if (imgPreview) {
                imgPreview.style.display = "none";
            }

            if(response.ok) {
                alert("livro adicionado com sucesso");
                location.reload();
            }

            // Atualizar a lista de livros
            fetchBooks();
        } catch (error) {
            console.error("Erro ao adicionar livro:", error);
            alert("Erro ao adicionar o livro.");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Adicionar";
        }
    });

    // Função para buscar e exibir livros
    async function fetchBooks() {
        try {
            const response = await fetch("http://localhost:1337/api/livros?populate=Capa");
            const result = await response.json();
            const books = result.data;

            const bookList = document.getElementById("bookList");
            bookList.innerHTML = ""; // Limpa a lista atual

            books.forEach((book) => {
                const bookItem = document.createElement("div");
                bookItem.classList.add("book", "swiper-slide");
                bookItem.innerHTML = `
                    <a href="#" class="openBookModal" data-title="${book.titulo}"
                        data-author="${book.Autor}"
                        data-description="${book.Descricao}"
                        data-cover="${book.Capa?.Data?.url || 'assets/modelo-geometrico-criativo-flyer-folheto.png'}">
                        <div class="book">
                            <img src="${book.Capa?.Data?.url || 'assets/modelo-geometrico-criativo-flyer-folheto.png'}" alt="${book.titulo}">
                            <p>${book.titulo}</p>
                        </div>
                    </a>
                `;
                bookList.appendChild(bookItem);

            });

            // Reconectar eventos de clique para abrir o modal de visualização
            const bookLinks = document.querySelectorAll(".openBookModal");
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
                    const viewBookModal = document.getElementById("viewBookModal");
                    viewBookModal.showModal();
                });
            });
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
        }
    }

    // Carregar livros ao iniciar a página
    fetchBooks();

    // Referências ao modal de confirmação
    const confirmDeleteModal = document.getElementById("confirmDeleteModal");
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    const cancelDeleteButton = document.getElementById("cancelDeleteButton");

    // Variável para armazenar o ID do livro a ser excluído
    let livroIdToDelete = null;

    // Função para abrir o modal de confirmação
    function openDeleteModal(livroId) {
        livroIdToDelete = livroId;
        confirmDeleteModal.showModal(); // Abre o modal imediatamente
    }

    // Função para fechar o modal de confirmação
    function closeDeleteModal() {
        confirmDeleteModal.close();
        livroIdToDelete = null;
    }

    // Evento para abrir o modal de confirmação ao clicar no botão de excluir
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-book-button")) {
            event.preventDefault();
            const livroId = event.target.getAttribute("data-id");
            openDeleteModal(livroId);
        }
    });

    // Evento para confirmar a exclusão
    confirmDeleteButton.addEventListener("click", async () => {
        if (livroIdToDelete) {
            try {
                const response = await fetch(`http://localhost:1337/api/livros/${livroIdToDelete}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Livro excluído com sucesso!");
                    closeDeleteModal();
                    fetchBooks(); // Atualiza a lista de livros
                } else {
                    console.error("Erro ao excluir livro:", response.statusText);
                    alert("Erro ao excluir o livro.");
                }
            } catch (error) {
                console.error("Erro ao excluir livro:", error);
                alert("Erro ao excluir o livro.");
            }
        }
    });

    // Evento para cancelar a exclusão
    cancelDeleteButton.addEventListener("click", () => {
        closeDeleteModal();
    });

    // Fechar o modal ao clicar fora dele
    confirmDeleteModal.addEventListener("click", (event) => {
        if (event.target === confirmDeleteModal) {
            closeDeleteModal();
        }
    });
});