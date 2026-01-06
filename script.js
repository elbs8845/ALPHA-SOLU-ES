// --------------------- USUÁRIOS ---------------------
let users = [{login:'admin', senha:'1234', tipo:'Admin'}];
let usuarioAtual = null;

// --------------------- LOGIN ---------------------
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

// --------------------- DASHBOARD ---------------------
window.onload = function() {
    const usuario = JSON.parse(localStorage.getItem('usuarioAtual'));
    if(!usuario) window.location.href = 'index.html';
    else {
        document.getElementById('usuarioName').textContent = usuario.login;
        showSection('leads');
    }
}
function logout() { 
    localStorage.removeItem('usuarioAtual'); 
    window.location.href = 'index.html'; 
}

// --------------------- MENU ---------------------
function showSection(id) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.style.display = 'none');
    const section = document.getElementById(id);
    if(section) section.style.display = 'block';
}

// --------------------- LEADS ---------------------
let leads = [];
function addLead() {
    const nome = document.getElementById('leadNome').value;
    const valor = document.getElementById('leadValor').value;
    const status = document.getElementById('leadStatus').value;
    const obs = document.getElementById('leadObs').value;
    if(!nome || !valor || !status) return alert('Preencha todos os campos obrigatórios');
    leads.push({nome, valor, status, obs});
    renderLeads();
    document.getElementById('leadNome').value='';
    document.getElementById('leadValor').value='';
    document.getElementById('leadStatus').value='';
    document.getElementById('leadObs').value='';
}
function renderLeads() {
    const list = document.getElementById('leadsList');
    list.innerHTML='';
    leads.forEach((l,i)=>{
        const li = document.createElement('li');
        li.textContent = `${l.nome} - R$${l.valor} - ${l.status} - ${l.obs}`;
        list.appendChild(li);
    });
}

// --------------------- VENDAS ---------------------
let vendas = [];
function addVenda() {
    const cliente = document.getElementById('vendaCliente').value;
    const valor = parseFloat(document.getElementById('vendaValor').value);
    const tipo = document.getElementById('vendaTipo').value;
    const status = document.getElementById('vendaStatus').value;
    const data = document.getElementById('vendaData').value;
    const obs = document.getElementById('vendaObs').value;
    if(!cliente || !valor || !tipo || !status || !data) return alert('Preencha todos os campos obrigatórios');
    vendas.push({cliente, valor, tipo, status, data, obs});
    renderVendas();
    updateProgresso();
    document.getElementById('vendaCliente').value='';
    document.getElementById('vendaValor').value='';
    document.getElementById('vendaTipo').value='';
    document.getElementById('vendaStatus').value='';
    document.getElementById('vendaData').value='';
    document.getElementById('vendaObs').value='';
}
function renderVendas(){
    const list=document.getElementById('vendasList'); 
    list.innerHTML='';
    vendas.forEach(v=>{
        const li=document.createElement('li'); 
        li.textContent=`${v.cliente} - R$${v.valor} - ${v.tipo} - ${v.status} - ${v.data} - ${v.obs}`; 
        list.appendChild(li);
    });
}
function updateProgresso(){
    const meta = parseFloat(document.getElementById('meta').value)||0;
    const totalVendas = vendas.reduce((acc,v)=>acc+v.valor,0);
    const perc = meta>0 ? Math.min((totalVendas/meta)*100,100) : 0;
    const barra = document.getElementById('barra');
    barra.style.width = perc+'%';
    barra.textContent = perc.toFixed(1)+'%';
    document.getElementById('percentual').textContent='Percentual atingido: '+perc.toFixed(1)+'%';
}

// --------------------- AGENDAMENTOS ---------------------
let agendamentos = [];
function addAgendamento() {
    const cliente = document.getElementById('agendamentoCliente').value;
    const data = document.getElementById('agendamentoData').value;
    const hora = document.getElementById('agendamentoHora').value;
    const obs = document.getElementById('agendamentoObs').value;
    if(!cliente || !data || !hora) return alert('Preencha todos os campos obrigatórios');
    agendamentos.push({cliente, data, hora, obs});
    renderAgendamentos();
    document.getElementById('agendamentoCliente').value='';
    document.getElementById('agendamentoData').value='';
    document.getElementById('agendamentoHora').value='';
    document.getElementById('agendamentoObs').value='';
}
function renderAgendamentos() {
    const list = document.getElementById('agendamentosList');
    list.innerHTML='';
    agendamentos.forEach((a,i)=>{
        const li = document.createElement('li');
        li.textContent = `${a.cliente} - ${a.data} ${a.hora} - ${a.
