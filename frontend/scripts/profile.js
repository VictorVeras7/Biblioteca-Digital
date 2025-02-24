document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("userId");
    const jwt = localStorage.getItem("jwt");

    if (!userId || !jwt) {
        alert("Usuário não autenticado!");
        window.location.href = "login.html"; // Redirecionar para a página de login
        return;
    }

    // Carregar informações do usuário
    try {
        const userResponse = await fetch(`http://localhost:1337/api/users/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Content-Type": "application/json"
            }
        });

        if (!userResponse.ok) {
            throw new Error("Erro ao carregar informações do usuário");
        }

        const userData = await userResponse.json();
        document.getElementById("user-name").textContent = userData.username;
        document.getElementById("user-email").textContent = userData.email;
        document.getElementById("user-id").textContent = userData.id;

    } catch (error) {
        console.error(error);
        alert("Erro ao carregar informações do usuário");
    }

    // Carregar livros alugados
    try {
        const rentResponse = await fetch(`http://localhost:1337/api/rents?filters[users_permissions_user][id][$eq]=${userId}&populate=livro`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Content-Type": "application/json"
            }
        });

        if (!rentResponse.ok) {
            throw new Error("Erro ao carregar livros alugados");
        }

        const rentData = await rentResponse.json();
        const bookList = document.getElementById("bookListProfile");

        if (rentData.data.length === 0) {
            bookList.innerHTML = "<li>Você não alugou nenhum livro ainda.</li>";
        } else {
            bookList.innerHTML = ""; // Limpar lista de carregamento

            rentData.data.forEach(rent => {
                const book = rent.livro;
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <div class="book-profile">
                        <img class="capa-profile" src="${book.capa || 'assets/modelo-geometrico-criativo-flyer-folheto.png'}" alt="capa">
                        <p>Título:<br>${book.titulo}</p>
                        <p>Autor:<br>${book.Autor}</p>
                    </div>
                    <button class="delete-book-profile" onclick="deleteRent('${rent.documentId}')">
                        <i class="bi bi-trash3"></i>
                    </button>
                `;
                bookList.appendChild(listItem);
            });
        }

    } catch (error) {
        console.error(error);
        alert("Erro ao carregar livros alugados");
    }
});

// Excluir aluguel
async function deleteRent(rentId) {

    let jwt = localStorage.getItem("jwt");

    if (!jwt) {
        alert("Você não está autenticado!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:1337/api/rents/${rentId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao excluir o aluguel");
        }

        alert("Livro excluído com sucesso!");
        location.reload();
    } catch (error) {
        console.error(error);
        alert("Erro ao excluir o aluguel");
    }
}

// Adiciona evento de logout ao botão "Sair"
const logoutButton = document.querySelector('.button-logout');
logoutButton.addEventListener('click', function (event) {
    event.preventDefault(); // Impede o comportamento padrão do link
    logout();
});

// Função para fazer logout
function logout() {
    // Remove o token JWT e os dados do usuário do localStorage
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');

    // Redireciona o usuário para a página de login
    window.location.href = 'login.html';
}