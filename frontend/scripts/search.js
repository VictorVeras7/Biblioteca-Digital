// Função para buscar livros no Strapi
async function searchBooks(query) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Limpa os resultados anteriores

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
                resultItem.className = 'book-item';
                resultItem.innerHTML = `
                    <img src="${livro.capa || 'assets/modelo-geometrico-criativo-flyer-folheto.png'}" alt="capa" width="50" height="50">
                    <a onclick="openBookModal(${livro.titulo}, ${livro.Autor}, ${livro.Descricao}, ${livro.capa})">${livro.titulo} - ${livro.Autor}</a>
                `;
                searchResults.appendChild(resultItem);
                
            });
        }
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        searchResults.innerHTML = '<p>Erro ao buscar livros. Tente novamente.</p>';
    }
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

// Monitora mudanças no DOM para reatribuir eventos quando o header mudar
// const observer = new MutationObserver(() => {
//     attachSearchButtonListener();
//     setupSearchInputListener(); // Configura o listener do campo de busca
// });

// observer.observe(document.body, { childList: true, subtree: true });

// Garante que os eventos sejam adicionados ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    attachSearchButtonListener();
    setupSearchInputListener(); // Configura o listener do campo de busca
});