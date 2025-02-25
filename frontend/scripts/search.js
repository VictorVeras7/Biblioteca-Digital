// Função para buscar livros no Strapi
async function searchBooks(query) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Limpa os resultados anteriores

    let currentDocumentId = null;
    let currentBookId = null;

    if (!query) {
        searchResults.innerHTML = '<p>Digite um termo para buscar.</p>';
        return;
    }

    try {
        // Faz a requisição à API do Strapi
        const response = await fetch(
            `http://localhost:1337/api/livros?filters[$or][0][titulo][$contains]=${query}&filters[$or][1][Autor][$contains]=${query}&populate=Capa`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const searchData = await response.json();
        console.log(searchData)

        if (searchData.data.length === 0) {
            searchResults.innerHTML = '<p>Nenhum livro encontrado.</p>';
            return;
        } else {
            // Exibe os resultados na barra lateral
            searchData.data.forEach(livro => {
                console.log(livro)
                const resultItem = document.createElement('div');
                resultItem.className = 'openBookModal';
                resultItem.setAttribute('data-document-id', livro.documentId);
                resultItem.setAttribute('data-author', livro.Autor);
                resultItem.setAttribute('data-description', livro.Descricao);
                resultItem.setAttribute('data-book-id', livro.id);
                resultItem.setAttribute('data-cover', 'assets/modelo-geometrico-criativo-flyer-folheto.png');
                console.log(livro.documentId);
                resultItem.innerHTML = `
                    <a href="#" class='book-item' 
                    data-title="${livro.titulo}"
                    data-document-id="${livro.documentId}"
                    data-author="${livro.Autor}>"
                    data-description="$${livro.Descricao}"
                    data-book-id="${livro.id}">
                        <div class="results">
                            <img src="${livro.Capa?.Data?.url || 'assets/modelo-geometrico-criativo-flyer-folheto.png'}" alt="${livro.titulo}">
                            <p>${livro.titulo}</p>
                        </div>
                    </a>`;
                searchResults.appendChild(resultItem);
                
            });
        }
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        searchResults.innerHTML = '<p>Erro ao buscar livros. Tente novamente.</p>';
    }

    const closeBookModal = document.getElementById("searchCloseBookModal");
    const viewBookModal = document.getElementById("searchViewBookModal");
    const deleteBookButton = document.getElementById("searchDeleteBookButton");
    const confirmDeleteModal = document.getElementById("confirmDeleteModal");
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    const alugarButton = document.getElementById("search-alugar-button");
    closeBookModal.addEventListener("click", () => viewBookModal.close());

    document.querySelectorAll(".book-item").forEach(link => {
        link.addEventListener("click", (event) => {
            console.log("click debug");
            event.preventDefault();
            const title = link.getAttribute("data-title");
            const author = link.getAttribute("data-author");
            const description = link.getAttribute("data-description");
            const cover = link.getAttribute("data-cover");
            currentDocumentId = link.getAttribute("data-document-id");
            currentBookId = link.getAttribute("data-book-id");
            console.log(currentBookId, currentDocumentId);

            document.getElementById("searchModalBookCover").src = 'assets/modelo-geometrico-criativo-flyer-folheto.png';
            document.getElementById("searchModalBookTitle").innerText = title;
            document.getElementById("searchModalBookAuthor").innerText = author;
            document.getElementById("searchModalBookDescription").innerText = description;

            let userRole = localStorage.getItem('userRole');

            if (userRole === 'Admin' || userRole === 'Librarian') {
                deleteBookButton.style.display = 'inline-block';
            } else {
                deleteBookButton.style.display = 'none';
            }

            viewBookModal.showModal();
        })
    })

    alugarButton.addEventListener("click", async() => {
        // Alugar livro
        const userId = localStorage.getItem("userId"); // O ID do usuário deve estar armazenado no localStorage
        const jwt = localStorage.getItem("jwt");

        if (!userId || !jwt) {
            alert("Usuário não autenticado!");
            return;
        }

        if (!currentBookId) {
            alert("Erro ao obter o ID do livro!");
            return;
        }

        const rentedDate = new Date().toISOString();
        const deadlineDate = new Date();
        deadlineDate.setDate(deadlineDate.getDate() + 15);
        const deadline = deadlineDate.toISOString();

        try {
            const response = await fetch("http://localhost:1337/api/rents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    data: {
                        users_permissions_user: { id: userId }, // Relacionamento com o usuário
                        livro: { id: currentBookId-1 }, // Relacionamento com o livro
                        rented: rentedDate,
                        deadline: deadline
                    }
                })
            });
            console.log("book id: ", currentBookId-1); // Por algum motivo o ID está ficando igual ao ID+1

            const result = await response.json();
            console.log(userId, currentDocumentId, rentedDate, deadline);
            if (!response.ok) {
                console.error("Erro ao alugar livro:", result);
                alert("Erro ao alugar o livro!");
                return;
            }

            alert("Livro alugado com sucesso!");
            viewBookModal.close();
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    })

    deleteBookButton.addEventListener("click", () => {
        let userRole = localStorage.getItem('userRole');
        console.log(currentDocumentId);
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
                    location.reload();
                } else {
                    console.error("Erro ao deletar livro:", await response.json());
                }
            } catch (error) {
                console.error("Erro ao deletar livro:", error);
            }
        }
    });
}

// Evento para capturar a entrada de busca
function setupSearchInputListener() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        // Busca ao pressionar Enter
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const query = event.target.value.trim();
                searchBooks(query); // Realiza a busca no Strapi
            }
        });
    }
}

// Função para abrir a barra lateral
function attachSearchButtonListener() {
    const searchButton = document.getElementById("search-button");

    if (searchButton) {
        searchButton.addEventListener("click", function(event) {
            event.preventDefault();
            const sidebar = document.getElementById("searchSidebar");
            sidebar.style.display = "block";
            setTimeout(() => {
                sidebar.style.right = "0";
            }, 10); // Pequeno delay para animação suave
        });
    }
}

// Função para fechar a barra lateral
function toggleSearchSidebar() {
    const sidebar = document.getElementById("searchSidebar");
    sidebar.style.right = "-250px";
    setTimeout(() => {
        sidebar.style.display = "none";
    }, 300); // Aguarda a animação antes de esconder
}

// Garante que os eventos sejam adicionados ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    attachSearchButtonListener();
    setupSearchInputListener(); // Configura o listener do campo de busca
});