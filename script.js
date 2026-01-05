```javascript
document.getElementById('leadObs').value='';
}
function renderLeads() {
const list = document.getElementById('leadsList');
list.innerHTML='';
leads.forEach((l,i)=>{const li=document.createElement('li');li.textContent=`${l.nome} - R$${l.valor} - ${l.status} - ${l.obs}`;list.appendChild(li);});
}


// --------------------- VENDAS ---------------------
let vendas = [];
function addVenda() {
const cliente=document.getElementById('vendaCliente').value;
const valor=parseFloat(document.getElementById('vendaValor').value);
const tipo=document.getElementById('vendaTipo').value;
const status=document.getElementById('vendaStatus').value;
const data=document.getElementById('vendaData').value;
const obs=document.getElementById('vendaObs').value;
if(!cliente||!valor||!tipo||!status||!data)return alert('Preencha todos os campos obrigatórios');
vendas.push({cliente, valor, tipo, status, data, obs});
renderVendas(); updateProgresso();
document.getElementById('vendaCliente').value='';
document.getElementById('vendaValor').value='';
document.getElementById('vendaTipo').value='';
document.getElementById('vendaStatus').value='';
document.getElementById('vendaData').value='';
document.getElementById('vendaObs').value='';
}
function renderVendas(){
const list=document.getElementById('vendasList'); list.innerHTML='';
vendas.forEach(v=>{const li=document.createElement('li'); li.textContent=`${v.cliente} - R$${v.valor} - ${v.tipo} - ${v.status} - ${v.data} - ${v.obs}`; list.appendChild(li);});
}
function updateProgresso(){
const meta=parseFloat(document.getElementById('meta').value)||0;
const totalVendas=vendas.reduce((acc,v)=>acc+v.valor,0);
const perc=meta>0?Math.min((totalVendas/meta)*100,100):0;
const barra=document.getElementById('barra');
barra.style.width=perc+'%'; barra.textContent=perc.toFixed(1)+'%';
document.getElementById('percentual').textContent='Percentual atingido: '+perc.toFixed(1)+'%';
}


// --------------------- PDF ---------------------
function gerarPDF(){
const { jsPDF }=window.jspdf; const doc=new jsPDF();
doc.text("Relatório de Vendas e Leads - ALPHA SOLUÇÕES",10,10);
doc.text("Leads:",10,20); leads.forEach((l,i)=>doc.text(`${i+1}. ${l.nome} - R$${l.valor} - ${l.status} - ${l.obs}`,10,30+i*10));
doc.text("Vendas:",10,40+leads.length*10); vendas.forEach((v,i)=>doc.text(`${i+1}. ${v.cliente} - R$${v.valor} - ${v.tipo} - ${v.status} - ${v.data}`,10,50+leads.length*10+i*10));
doc.save("relatorio_alpha_solucoes.pdf");
}


// --------------------- USUÁRIOS ADMIN ---------------------
function criarUsuario(){
const login=document.getElementById('novoUsuario').value;
const senha=document.getElementById('novaSenha').value;
const tipo=document.getElementById('tipoUsuario').value;
if(!login||!senha||!tipo)return alert('Preencha todos os campos');
if(users.find(u=>u.login===login))return alert('Usuário já existe');
users.push({login,senha,tipo}); renderUsuarios();
document.getElementById('novoUsuario').value='';
document.getElementById('novaSenha').value='';
document.getElementById('tipoUsuario').value='';
}
function renderUsuarios(){
const list=document.getElementById('usuariosList'); list.innerHTML='';
users.forEach((u,i)=>{const li=document.createElement('li'); li.textContent=`${u.login} - ${u.tipo}`; list.appendChild(li);});
}
