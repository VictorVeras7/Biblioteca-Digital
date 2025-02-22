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
                <a href="#inicio"><i class="bi bi-house-door-fill"></i></a>
                <a href="#"><i class="bi bi-person-circle"></i></a>
                <a href="#"><button class="button-logout"><i class="bi bi-box-arrow-right"></i> Sair</button></a>
                <a href="#" id="search-button"><i class='bx bx-search-alt-2'></i></a>
            </nav>
        </header>
    `;

    // Renderiza o header apropriado
    if (jwt) {
        headerContainer.innerHTML = headerLogged;

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

// Função para fazer logout
function logout() {
    // Remove o token JWT e os dados do usuário do localStorage
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');

    // Redireciona o usuário para a página de login
    window.location.href = 'login.html';
}