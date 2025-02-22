document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    const dados = {
        username: nome,
        email: email,
        password: senha
    };

    try {
        const resposta = await fetch('http://127.0.0.1:1337/api/auth/local/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html';
        } else {
            alert(`Erro: ${resultado.error.message}`);
        }
    } catch (erro) {
        console.error('Erro ao enviar dados:', erro);
        alert('Ocorreu um erro ao tentar se registrar. Tente novamente.');
    }
});