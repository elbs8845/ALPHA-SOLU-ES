window.login = function() {
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;
  const error = document.getElementById('error');

  const users = JSON.parse(localStorage.getItem('users')) || [{login:'admin', senha:'1234', tipo:'Admin'}];
  const encontrado = users.find(u => u.login === user && u.senha === pass);
  if(encontrado) {
    localStorage.setItem('usuarioAtual', JSON.stringify(encontrado));
    window.location.href = 'dashboard.html';
  } else {
    error.textContent = 'Usuário ou senha incorretos';
  }
};

// ===== Usuários iniciais =====
let users = JSON.parse(localStorage.getItem('users')) || [{login:'admin', senha:'1234', tipo:'Admin'}];
let usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual')) || null;

// ===== Login =====
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

// ===== Verificar login ao abrir dashboard =====
document.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('usuarioName')) {
    if(!usuarioAtual) {
      logout();
    } else {
      document.getElementById('usuarioName').textContent = usuarioAtual.login;
      listarUsuarios();
      listarLeads();
      listarVendas();
      listarRanking();
    }
  }
});

// ===== Seções do Dashboard =====
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display='none');
  document.getElementById(id).style.display='block';
}

// ===== Leads =====
let leads = JSON.parse(localStorage.getItem('leads')) || [];

function addLead() {
  const nome = document.getElementById('leadNome').value;
  const valor = document.getElementById('leadValor').value;
  const status = document.getElementById('leadStatus').value;
  const obs = document.getElementById('leadObs').value;

  if(!nome || !valor || !status) return alert('Preencha todos os campos obrigatórios');

  leads.push({nome, valor: Number(valor), status, obs});
  localStorage.setItem('leads', JSON.stringify(leads));
  listarLeads();
}

function listarLeads() {
  const ul = document.getElementById('leadsList');
  if(!ul) return;
  ul.innerHTML = '';
  leads.forEach((lead, i) => {
    const li = document.createElement('li');
    li.textContent = `${lead.nome} - R$${lead.valor} - ${lead.status} - ${lead.obs}`;
    ul.appendChild(li);
  });
}

// ===== Vendas e Metas =====
let vendas = JSON.parse(localStorage.getItem('vendas')) || [];

function addVenda() {
  const cliente = document.getElementById('vendaCliente').value;
  const valor = document.getElementById('vendaValor').value;
  const tipo = document.getElementById('vendaTipo').value;
  const status = document.getElementById('vendaStatus').value;
  const data = document.getElementById('vendaData').value;
  const obs = document.getElementById('vendaObs').value;
  const meta = Number(document.getElementById('meta').value || 0);

  if(!cliente || !valor || !tipo || !status || !data) return alert('Preencha todos os campos obrigatórios');

  vendas.push({cliente, valor: Number(valor), tipo, status, data, obs});
  localStorage.setItem('vendas', JSON.stringify(vendas));
  listarVendas(meta);
}

function listarVendas(meta=0) {
  const ul = document.getElementById('vendasList');
  if(!ul) return;
  ul.innerHTML = '';
  let total = 0;
  vendas.forEach((v, i) => {
    const li = document.createElement('li');
    li.textContent = `${v.cliente} - R$${v.valor} - ${v.tipo} - ${v.status} - ${v.data} - ${v.obs}`;
    ul.appendChild(li);
    if(v.status === 'Confirmada') total += v.valor;
  });

  // Atualiza barra de progresso
  const barra = document.getElementById('barra');
  const percentual = meta > 0 ? Math.min(Math.round((total/meta)*100), 100) : 0;
  if(barra) barra.style.width = percentual+'%';
  const p = document.getElementById('percentual');
  if(p) p.textContent = `Percentual atingido: ${percentual}%`;

  // Atualiza gráfico
  if(document.getElementById('graficoVendas')) {
    const ctx = document.getElementById('graficoVendas').getContext('2d');
    const chartData = {
      labels: vendas.map(v => v.cliente),
      datasets: [{
        label: 'Valor da Venda',
        data: vendas.map(v => v.valor),
        backgroundColor: '#f97316'
      }]
    };
    if(window.grafico) window.grafico.destroy();
    window.grafico = new Chart(ctx, {type:'bar', data: chartData});
  }
}

// ===== Relatórios PDF =====
function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Relatório de Vendas", 10, 10);
  vendas.forEach((v,i) => {
    doc.text(`${i+1}. ${v.cliente} - R$${v.valor} - ${v.tipo} - ${v.status}`, 10, 20+(i*10));
  });
  doc.save("relatorio.pdf");
}

// ===== Ranking =====
function listarRanking() {
  const rankingList = document.getElementById('rankingList');
  if(!rankingList) return;
  rankingList.innerHTML = '';
  const ranking = [...vendas].filter(v=>v.status==='Confirmada')
                .sort((a,b)=>b.valor-a.valor);
  ranking.forEach((v,i) => {
    const li = document.createElement('li');
    li.textContent = `${i+1}. ${v.cliente} - R$${v.valor}`;
    rankingList.appendChild(li);
  });

  // Gráfico ranking
  if(document.getElementById('graficoRanking')) {
    const ctx = document.getElementById('graficoRanking').getContext('2d');
    const chartData = {
      labels: ranking.map(v => v.cliente),
      datasets: [{
        label: 'Ranking Vendas',
        data: ranking.map(v => v.valor),
        backgroundColor: '#f97316'
      }]
    };
    if(window.rankingChart) window.rankingChart.destroy();
    window.rankingChart = new Chart(ctx, {type:'bar', data: chartData});
  }
}

// ===== Gerenciar Usuários =====
function criarUsuario() {
  const login = document.getElementById('novoUsuario').value;
  const senha = document.getElementById('novaSenha').value;
  const tipo = document.getElementById('tipoUsuario').value;

  if(!login || !senha || !tipo) return alert('Preencha todos os campos');

  if(users.find(u=>u.login===login)) return alert('Usuário já existe');

  users.push({login, senha, tipo});
  localStorage.setItem('users', JSON.stringify(users));
  listarUsuarios();
}

function listarUsuarios() {
  const ul = document.getElementById('usuariosList');
  if(!ul) return;
  ul.innerHTML = '';
  users.forEach((u,i)=>{
    const li = document.createElement('li');
    li.textContent = `${u.login} - ${u.tipo}`;
    ul.appendChild(li);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnEntrar');
  btn.addEventListener('click', () => {
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;
    const error = document.getElementById('error');

    const users = JSON.parse(localStorage.getItem('users')) || [{login:'admin', senha:'1234', tipo:'Admin'}];
    const encontrado = users.find(u => u.login === user && u.senha === pass);
    if(encontrado) {
      localStorage.setItem('usuarioAtual', JSON.stringify(encontrado));
      window.location.href = 'dashboard.html';
    } else {
      error.textContent = 'Usuário ou senha incorretos';
    }
  });
});

