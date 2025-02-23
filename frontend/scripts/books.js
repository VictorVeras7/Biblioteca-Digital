document.addEventListener("DOMContentLoaded", () => {
    console.log("Script de adicionar livro carregado!");

    const userRole = localStorage.getItem('userRole');
    const bookModal = document.getElementById("bookModal");
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.getElementById("closeModal");
    const bookList = document.getElementById("bookList");
    const viewBookModal = document.getElementById("viewBookModal");
    const closeBookModal = document.getElementById("closeBookModal");
    const confirmDeleteModal = document.getElementById("confirmDeleteModal");
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    const cancelDeleteButton = document.getElementById("cancelDeleteButton");
    const deleteBookButton = document.getElementById("deleteBookButton");

    let currentDocumentId = null;

    if (userRole === 'Admin' || userRole === 'Librarian') {
        openModalBtn.style.display = 'inline-block';
    } else {
        openModalBtn.style.display = 'none';
    }

    openModalBtn.addEventListener("click", () => bookModal.showModal());
    closeModalBtn.addEventListener("click", () => bookModal.close());
    closeBookModal.addEventListener("click", () => viewBookModal.close());
    cancelDeleteButton.addEventListener("click", () => confirmDeleteModal.close());

    async function fetchBooks() {
        try {
            const response = await fetch("http://localhost:1337/api/livros?populate=Capa");
            const result = await response.json();
            const books = result.data;

            bookList.innerHTML = "";
            books.forEach((book) => {
                const bookItem = document.createElement("div");
                bookItem.classList.add("book", "swiper-slide");
                bookItem.setAttribute("data-document-id", book.documentId);
                bookItem.innerHTML = `
                    <a href="#" class="openBookModal" data-title="${book.titulo}"
                        data-author="${book.Autor}"
                        data-description="${book.Descricao}"
                        data-document-id="${book.documentId}"
                        data-cover="${book.Capa?.Data?.url || 'assets/modelo-geometrico-criativo-flyer-folheto.png'}">
                        <div class="book">
                            <img src="${book.Capa?.Data?.url || 'assets/modelo-geometrico-criativo-flyer-folheto.png'}" alt="${book.titulo}">
                            <p>${book.titulo}</p>
                        </div>
                    </a>`;
                bookList.appendChild(bookItem);
            });

            document.querySelectorAll(".openBookModal").forEach(link => {
                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    const title = link.getAttribute("data-title");
                    const author = link.getAttribute("data-author");
                    const description = link.getAttribute("data-description");
                    const cover = link.getAttribute("data-cover");
                    currentDocumentId = link.getAttribute("data-document-id");

                    document.getElementById("modalBookCover").src = cover;
                    document.getElementById("modalBookTitle").innerText = title;
                    document.getElementById("modalBookAuthor").innerText = author;
                    document.getElementById("modalBookDescription").innerText = description;

                    if (userRole === 'Admin' || userRole === 'Librarian') {
                        deleteBookButton.style.display = 'inline-block';
                    } else {
                        deleteBookButton.style.display = 'none';
                    }

                    viewBookModal.showModal();
                });
            });
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
        }
    }

    deleteBookButton.addEventListener("click", () => {
        let userRole = localStorage.getItem('userRole');
        if (currentDocumentId && userRole === 'Admin' || userRole === 'Librarian') {
            confirmDeleteModal.showModal();
        } else {
            alert("Você não tem permissão para excluir um livro ou houve uma falha no sistema!");
        }
    });

    confirmDeleteButton.addEventListener("click", async () => {
        if (currentDocumentId) {
            try {
                const response = await fetch(`http://localhost:1337/api/livros/${currentDocumentId}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                });

                if (response.ok) {
                    alert("Livro deletado com sucesso!");
                    confirmDeleteModal.close();
                    viewBookModal.close();
                    fetchBooks();
                } else {
                    console.error("Erro ao deletar livro:", await response.json());
                }
            } catch (error) {
                console.error("Erro ao deletar livro:", error);
            }
        }
    });

    fetchBooks();
});
