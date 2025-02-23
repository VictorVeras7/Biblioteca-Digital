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

// Monitora mudanças no DOM para reatribuir eventos quando o header mudar
const observer = new MutationObserver(() => {
    attachSearchButtonListener();
});

observer.observe(document.body, { childList: true, subtree: true });

// Função para fechar a barra lateral
function toggleSearchSidebar() {
    const sidebar = document.getElementById("searchSidebar");
    sidebar.style.right = "-250px";
    setTimeout(() => {
        sidebar.style.display = "none";
    }, 300); // Aguarda a animação antes de esconder
}

// Garante que o evento seja adicionado ao carregar a página
document.addEventListener("DOMContentLoaded", attachSearchButtonListener);
