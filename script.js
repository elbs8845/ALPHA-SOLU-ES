// ===== Usuários iniciais =====
let users = JSON.parse(localStorage.getItem('users')) || [
  {login:'admin', senha:'1234', tipo:'Admin'}
];

// ===== Botão Entrar =====
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnEntrar');
  if(btn) {
    btn.addEventListener('click', () => {
      const user = document.getElementById('user').value;
      const pass = document.getElementById('pass').value;
      const error = document.getElementById('error');

      const encontrado = users.find(u => u.login === user && u.senha === pass);
      if(encontrado) {
        localStorage.setItem('usuarioAtual', JSON.stringify(encontrado));
        window.location.href = 'dashboard.html';
      } else {
        error.textContent = 'Usuário ou senha incorretos';
      }
    });
  }
});
