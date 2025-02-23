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
        const response = await fetch(`http://localhost:1337/api/livros?filters[$or][0][titulo][$contains]=${query}&filters[$or][1][autor][$contains]=${query}`);
        const data = await response.json();

        if (data.data.length === 0) {
            searchResults.innerHTML = '<p>Nenhum livro encontrado.</p>';
            return;
        }

        // Exibe os resultados na barra lateral
        data.data.forEach(livro => {
            const livroAttributes = livro.attributes;
            const resultItem = document.createElement('div');
            resultItem.className = 'book-item';
            resultItem.innerHTML = `
                <img src="${livroAttributes.capa}" alt="${livroAttributes.titulo}">
                <p>${livroAttributes.titulo} - ${livroAttributes.autor}</p>
            `;
            searchResults.appendChild(resultItem);
        });
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        searchResults.innerHTML = '<p>Erro ao buscar livros. Tente novamente.</p>';
    }
}

// Evento para capturar a entrada de busca
function setupSearchInputListener() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const query = event.target.value.trim();
            searchBooks(query); // Realiza a busca no Strapi
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
const observer = new MutationObserver(() => {
    attachSearchButtonListener();
    setupSearchInputListener(); // Configura o listener do campo de busca
});

observer.observe(document.body, { childList: true, subtree: true });

// Garante que os eventos sejam adicionados ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    attachSearchButtonListener();
    setupSearchInputListener(); // Configura o listener do campo de busca
});