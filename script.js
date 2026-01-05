// Usuários iniciais
let users = [{login:'admin', senha:'1234', tipo:'Admin'}];
let usuarioAtual = null;

function login() {
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;
  const error = document.getElementById('error');

  const encontrado = users.find(u => u.login === user && u.senha === pass);
  if(encontrado) {
    usuarioAtual = encontrado;
    localStorage.setItem('usuarioAtual', JSON.stringify(encontrado));
    window.location.href = 'dashboard.html';
  } else {
    error.textContent = 'Usuário ou senha incorretos';
  }
}

function logout() {
  localStorage.removeItem('usuarioAtual');
  window.location.href = 'index.html';
}

// Funções adicionais: addLead, addVenda, criarUsuario, gerarPDF, showSection
// (Cole aqui o restante do script que gerencia Leads, Vendas, Rankings, PDF e Usuários)
