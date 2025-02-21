document.getElementById("search-button").addEventListener("click", function(event) {
    event.preventDefault();
    const sidebar = document.getElementById("searchSidebar");
    sidebar.style.display = "block";
    setTimeout(() => {
        sidebar.style.right = "0";
    }, 10); // Pequeno delay para animação suave
});

function toggleSearchSidebar() {
    const sidebar = document.getElementById("searchSidebar");
    sidebar.style.right = "-250px";
    setTimeout(() => {
        sidebar.style.display = "none";
    }, 300); // Aguarda a animação antes de esconder
}