"use strict";
const Login = document.querySelector("form");
Login.addEventListener("Submit", function (event) {
    if (!Login.checkValidity() || Login.checkValidity() == null) {
        alert("Porfavor, preencha todos os campos corretamente!");
        return alert;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const dados = {
            identifier: email,
            password: password
        };

        try {
            const resposta = await fetch('http://127.0.0.1:1337/api/auth/local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();

            if (resposta.ok) {
                alert('Login realizado com sucesso!');
                console.log('Dados do usuário:', resultado);

                // Salva o token JWT no localStorage
                localStorage.setItem('jwt', resultado.jwt);
                localStorage.setItem('user', JSON.stringify(resultado.user));
                localStorage.setItem('userId', resultado.user.id);

                const respostaUser = await fetch(`http://127.0.0.1:1337/api/users/${resultado.user.id}?populate=role`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${resultado.jwt}`, // Token JWT
                        'Content-Type': 'application/json'
                    }
                });

                const resultadoUser = await respostaUser.json();
                console.log(resultadoUser);

                if (respostaUser.ok && resultadoUser.role) {
                    localStorage.setItem('userRole', resultadoUser.role.name); // Armazena o nome da role
                    console.log('Role do usuário: ', resultadoUser.role.name);
                } else {
                    console.error('Role do usuário não encontrada no objeto:', resultado);
                }
                window.location.href = 'index.html';
            } else {
                alert(`Erro: ${resultado.error.message}`);
            }
        } catch (erro) {
            console.error('Erro ao enviar dados:', erro);
            alert('Ocorreu um erro ao tentar fazer login. Tente novamente.');
        }
    });
});