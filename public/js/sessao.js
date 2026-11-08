// sessão
function validarSessao() {
    var email = sessionStorage.getItem("userEmail");
    var name = sessionStorage.getItem("userName");
    var id = sessionStorage.getItem("userId");

    if (!email || !name || !id) {
        window.location = "../login.html";
        return;
    }

    var nameElements = document.querySelectorAll(".js-nome");
    var avatarElements = document.querySelectorAll(".js-iniciais");
    var initials = name.trim().split(/\s+/).map(function (part) {
        return part.charAt(0);
    }).slice(0, 2).join("").toUpperCase();

    nameElements.forEach(function (element) {
        element.textContent = name;
    });
    avatarElements.forEach(function (element) {
        element.textContent = initials;
    });
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar) {
        divAguardar.style.display = "flex";
    }
    var submitButton = document.querySelector(".formulario button[type='submit']");
    if (submitButton) {
        submitButton.disabled = true;
    }
}

function finalizarAguardar(message) {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar) {
        divAguardar.style.display = "none";
    }
    var submitButton = document.querySelector(".formulario button[type='submit']");
    if (submitButton) {
        submitButton.disabled = false;
    }

    var errorElement = document.getElementById("div_erros_login");
    if (errorElement) {
        errorElement.style.display = message ? "flex" : "none";
        errorElement.textContent = message || "";
    }
}

