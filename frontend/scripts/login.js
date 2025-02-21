"use strict";
const Login = document.querySelector("form");
Login.addEventListener("Submit", function (event) {
    if (!Login.checkValidity() || Login.checkValidity() == null) {
        alert("Porfavor, preencha todos os campos corretamente!");
        return alert;
    }
});
