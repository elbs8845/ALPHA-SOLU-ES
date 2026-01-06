// ---------- USUÁRIOS ----------
let users = JSON.parse(localStorage.getItem('users')) || [
  {login:'admin', senha:'1234', tipo:'Admin'},
  {login:'supervisor', senha:'1234', tipo:'Supervisor'},
  {login:'vendedor', senha:'1234', tipo:'Vendedor'}
];

// ---------- LOGIN ----------
document.getElementById('loginBtn').addEventListener('click', login);

function login() {
    const user = document.getElementById('user').value.trim();
    const pass = document.getElementById('pass').value.trim();
    const error = document.getElementById('error');

    const encontrado = users.find(u => u.login === user && u.senha === pass);
    if(encontrado) {
        localStorage.setItem('usuarioAtual', JSON.stringify(encontrado));
        window.location.href = 'dashboard.html';
    } else {
        error.textContent = 'Usuário ou senha incorretos';
    }
}

// ---------- SALVAR USUÁRIOS ----------
function salvarUsuarios() {
    localStorage.setItem('users', JSON.stringify(users));
}
