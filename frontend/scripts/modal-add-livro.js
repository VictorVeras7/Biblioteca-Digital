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
                        Autor: author,
                        Genero: genre,
                        Descricao: description,
                        Capa: coverId, // Associar a capa ao livro
                    },
                }),
            });

            const result = await response.json();
            console.log("Livro Adicionado:", result);

            alert("Livro adicionado com sucesso!");

            // Fechar modal após adicionar livro
            bookModal.close();

            // Limpar o formulário
            bookForm.reset();
            const imgPreview = document.getElementById("bookCoverPreview");
            if (imgPreview) {
                imgPreview.style.display = "none";
            }

            // Atualizar a lista de livros (se necessário)
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
                bookItem.classList.add("book-item", "swiper-slide");
                bookItem.innerHTML = `
                        <a href="#" class="openBookModal" data-title="${book.titulo}"
                            data-author="${book.Autor}"
                            data-description="${book.Descricao}"
                            data-cover="https://covers.odilo.io/public/OdiloPlace_Bookwire_Brasil_BR/9786588470503_ORIGINAL.jpg">
                    <div class="book">
                        <img src="${book.Capa?.data?.url || 'assets/modelo-geometrico-criativo-flyer-folheto.png'}" alt="${book.titulo}">
                        <p>${book.titulo}</p>
                    </div>
                    </a>
                `;
                bookList.appendChild(bookItem);
            });
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
        }
    }

    // Carregar livros ao iniciar a página
    fetchBooks();
});