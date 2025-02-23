document.addEventListener('DOMContentLoaded', function () {
    const userRole = localStorage.getItem('userRole');
    const usersList = document.getElementById('users-list');
    const logoutButton = document.getElementById('logoutButton');

    // Verifica se o usuário é admin
    if (userRole !== 'Admin') {
        alert('Acesso negado. Apenas administradores podem acessar esta página.');
        window.location.href = 'index.html'; // Redireciona para a página inicial
        return;
    }

    async function loadUsers() {
        try {
            const resposta = await fetch('http://localhost:1337/api/users?populate=role', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            });

            const usuarios = await resposta.json();

            if (resposta.ok) {
                usersList.innerHTML = ''; // Limpa a lista
                usuarios.forEach(user => {
                    const userCard = document.createElement('div');
                    userCard.className = 'user-card';

                    userCard.innerHTML = `
                        <div class="user-info">
                            <p><strong>Username:</strong> ${user.username}</p>
                            <p><strong>Email:</strong> ${user.email}</p>
                            <p><strong>Role:</strong> ${user.role?.name || 'N/A'}</p>
                        </div>
                        <div class="user-actions">
                            <button class="role-button" onclick="changeRole(${user.id})">Mudar Role</button>
                            <button class="delete-button" onclick="deleteUser(${user.id})">Deletar</button>
                        </div>
                    `;

                    usersList.appendChild(userCard);
                });
            } else {
                console.error('Erro ao carregar usuários:', usuarios);
            }
        } catch (erro) {
            console.error('Erro ao carregar usuários:', erro);
        }
    }

    // Função para deletar um usuário
    window.deleteUser = async function (userId) {
        if (confirm('Tem certeza que deseja deletar este usuário?')) {
            try {
                const resposta = await fetch(`http://localhost:1337/api/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                });

                if (resposta.ok) {
                    alert('Usuário deletado com sucesso!');
                    loadUsers(); // Recarrega a lista de usuários
                } else {
                    console.error('Erro ao deletar usuário:', await resposta.json());
                }
            } catch (erro) {
                console.error('Erro ao deletar usuário:', erro);
            }
        }
    };

    // Função para mudar a role de um usuário
    window.changeRole = async function (userId) {
        const novaRole = prompt('Digite a nova role (Admin, Authenticated ou Librarian):');
        let roleId;
        if (novaRole && (novaRole === 'Admin' || novaRole === 'Authenticated' || novaRole === 'Librarian')) {
            if (novaRole === 'Admin') {
                roleId = 3;
            } else if (novaRole === 'Authenticated') {
                roleId = 1;
            } else if (novaRole === 'Librarian') {
                roleId = 4;
            }
            try {
                const resposta = await fetch(`http://localhost:1337/api/users/${userId}?populate=role`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        role: roleId
                    })
                });

                console.log(resposta);

                if (resposta.ok) {
                    alert('Role do usuário atualizada com sucesso!');
                    loadUsers(); // Recarrega a lista de usuários
                } else {
                    console.error('Erro ao atualizar role:', await resposta.json());
                }
            } catch (erro) {
                console.error('Erro ao atualizar role:', erro);
            }
        } else {
            alert('Role inválida. Use "Admin", "Authenticated" ou "Librarian".');
        }
    };

    // Logout
    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        window.location.href = 'login.html';
    });

    // Carrega os usuários ao abrir a página
    loadUsers();
});