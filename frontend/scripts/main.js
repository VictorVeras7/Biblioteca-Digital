"use strict";
const swiper = new Swiper('.swiper', {
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        0: {
            sliderPerView: 3
        },
        620: {
            slidesPerView: 5
        },
        1024: {
            slidesPerView: 9
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const headerContainer = document.getElementById('header-container');
    const jwt = localStorage.getItem('jwt'); // Verifica se há um token JWT

    // Header para usuário não logado
    const headerNotLogged = `
        <header>
            <div><img src="./assets/logo-biblioteca-digital.png" alt="logo-biblioteca-digital"></div>
            <nav>
                <a href="#inicio"><i class="bi bi-house-door-fill"></i></a>
                <a href="login.html">Identificar-se</a>
                <a href="cadastro.html">Cadastrar-se</a>
                <a href="#" id="search-button"><i class="bi bi-search"></i></a>
            </nav>
        </header>
    `;

    // Header para usuário logado
    const headerLogged = `
        <header>
            <div><img src="./assets/logo-biblioteca-digital.png" alt="logo-biblioteca-digital"></div>
            <nav>
                <a href="#inicio" title="Página inicial"><i class="bi bi-house-door-fill"></i></a>
                <a href="#" title="Abrir perfil"><i class="bi bi-person-circle"></i></a>
                <a href="#" title="Encerrar sessão"><button class="button-logout"><i class="bi bi-box-arrow-right"></i> Sair</button></a>
                <a href="#" id="search-button" title="Pesquisar livros"><i class='bx bx-search-alt-2'></i></a>
            </nav>
        </header>
    `;

    const adminHeader = `
        <header>
            <div><img src="./assets/logo-biblioteca-digital.png" alt="logo-biblioteca-digital"></div>
            <nav>
                <a href="users.html" title="Gerenciar usuários"><i class="bi bi-person-gear"></i></a>
                <a href="#inicio" title="Pagina inicial"><i class="bi bi-house-door-fill"></i></a>
                <a href="#" title="Abrir perfil"><i class="bi bi-person-circle"></i></a>
                <a href="#" title="Encerrar sessão"><button class="button-logout"><i class="bi bi-box-arrow-right"></i> Sair</button></a>
                <a href="#" id="search-button" title="Pesquisar livros"><i class='bx bx-search-alt-2'></i></a>
            </nav>
        </header>
    `;

    // Renderiza o header apropriado
    if (jwt) {
        if ((localStorage.getItem('userRole')) === 'Admin') {
            headerContainer.innerHTML = adminHeader;
        } else {
            headerContainer.innerHTML = headerLogged;
        }

        // Adiciona evento de logout ao botão "Sair"
        const logoutButton = document.querySelector('.button-logout');
        logoutButton.addEventListener('click', function (event) {
            event.preventDefault(); // Impede o comportamento padrão do link
            logout();
        });
    } else {
        headerContainer.innerHTML = headerNotLogged;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Verifica se o usuário está logado
    const jwt = localStorage.getItem('jwt');
    const userRole = localStorage.getItem('userRole'); // Obtém a role do usuário

    if (jwt && userRole === 'Admin') {
        // Se o usuário for admin, mostra os botões
        const buttons = document.querySelectorAll('.add-book-button');
        buttons.forEach(button => {
            button.style.display = 'inline-block'; // Mostra os botões
        });
    } else {
        // Se o usuário não for admin, oculta os botões
        const buttons = document.querySelectorAll('.add-book-button');
        buttons.forEach(button => {
            button.style.display = 'none'; // Oculta os botões
        });
    }
});

// Função para fazer logout
function logout() {
    // Remove o token JWT e os dados do usuário do localStorage
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');

    // Redireciona o usuário para a página de login
    window.location.href = 'login.html';
}