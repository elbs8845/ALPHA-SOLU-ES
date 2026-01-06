document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnEntrar');
  const error = document.getElementById('error');

  btn.addEventListener('click', () => {
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;

    console.log("Clicou! Usuário:", user, "Senha:", pass); // TESTE
    if(user === "admin" && pass === "1234") {
      window.location.href = "dashboard.html";
    } else {
      error.textContent = "Usuário ou senha incorretos";
    }
  });
});
