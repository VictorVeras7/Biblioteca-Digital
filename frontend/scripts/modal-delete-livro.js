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
            const livroId = event.target.closest("delete-book-button").getAttribute("data-id");
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