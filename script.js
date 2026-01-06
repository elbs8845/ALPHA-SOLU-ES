const users = [
  {login: "admin", senha: "1234", tipo: "Admin"}
];

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnEntrar");
  const error = document.getElementById("error");

  btn.addEventListener("click", () => {
    const user = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value.trim();

    if(user === "" || pass === "") {
      error.textContent = "Preencha todos os campos";
      return;
    }

    const encontrado = users.find(u => u.login === user && u.senha === pass);

    if(encontrado) {
      // Redireciona para dashboard
      window.location.href = "dashboard.html";
    } else {
      error.textContent = "Usuário ou senha incorretos";
    }
  });
});
