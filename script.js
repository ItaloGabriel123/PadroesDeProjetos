// Limpar receitas antigas e inicializar
localStorage.removeItem("receitas");
let receitas = [];

const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
if (!usuarioLogado) {
  window.location.href = "login.html";
}

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "login.html";
}

function salvarReceita() {
  const id = document.getElementById("receita-id").value;
  const titulo = document.getElementById("titulo").value;
  const ingredientes = document.getElementById("ingredientes").value;
  const modoPreparo = document.getElementById("modoPreparo").value;

  if (!titulo || !ingredientes || !modoPreparo) {
    alert("Preencha todos os campos!");
    return;
  }

  if (id) {
    receitas = receitas.map(r =>
      r.id == id ? { ...r, titulo, ingredientes, modoPreparo } : r
    );
  } else {
    const novaReceita = {
      id: Date.now(),
      titulo,
      ingredientes,
      modoPreparo,
      autor: usuarioLogado.nome,
      tipoAutor: usuarioLogado.tipo,
      saudavel: usuarioLogado.tipo === "nutricionista"
    };
    receitas.push(novaReceita);
  }

  localStorage.setItem("receitas", JSON.stringify(receitas));
  limparFormulario();
  listarReceitas();
}

function listarReceitas() {
  const lista = document.getElementById("lista-receitas");
  lista.innerHTML = "";

  receitas
    .filter(r => r.autor === usuarioLogado.nome || r.tipoAutor === "nutricionista")
    .forEach(receita => {
      const div = document.createElement("div");
      div.className = "receita-card";

      div.innerHTML = `
        <h3>${receita.titulo}</h3>
        <p><strong>Ingredientes:</strong><br>${receita.ingredientes}</p>
        <p><strong>Modo de Preparo:</strong><br>${receita.modoPreparo}</p>
        <p><em>Por ${receita.autor}</em> ${receita.saudavel ? '🥗 Saudável' : ''}</p>
        <button onclick="editarReceita(${receita.id})">Editar</button>
        <button onclick="removerReceita(${receita.id})">Remover</button>
      `;

      lista.appendChild(div);
    });
}

function buscarReceitas() {
  const termo = document.getElementById("buscar").value.toLowerCase();
  const lista = document.getElementById("lista-receitas");
  lista.innerHTML = "";

  receitas
    .filter(r => (r.autor === usuarioLogado.nome || r.tipoAutor === "nutricionista") &&
      (r.titulo.toLowerCase().includes(termo) ||
       r.ingredientes.toLowerCase().includes(termo) ||
       r.modoPreparo.toLowerCase().includes(termo)))
    .forEach(receita => {
      const div = document.createElement("div");
      div.className = "receita-card";

      div.innerHTML = `
        <h3>${receita.titulo}</h3>
        <p><strong>Ingredientes:</strong><br>${receita.ingredientes}</p>
        <p><strong>Modo de Preparo:</strong><br>${receita.modoPreparo}</p>
        <p><em>Por ${receita.autor}</em> ${receita.saudavel ? '🥗 Saudável' : ''}</p>
        <button onclick="editarReceita(${receita.id})">Editar</button>
        <button onclick="removerReceita(${receita.id})">Remover</button>
      `;

      lista.appendChild(div);
    });
}

function editarReceita(id) {
  const receita = receitas.find(r => r.id === id && r.autor === usuarioLogado.nome);
  if (!receita) return alert("Você só pode editar suas próprias receitas!");

  document.getElementById("receita-id").value = receita.id;
  document.getElementById("titulo").value = receita.titulo;
  document.getElementById("ingredientes").value = receita.ingredientes;
  document.getElementById("modoPreparo").value = receita.modoPreparo;

  document.getElementById("form-title").innerText = "Editar Receita";
}

function removerReceita(id) {
  const receita = receitas.find(r => r.id === id && r.autor === usuarioLogado.nome);
  if (!receita) return alert("Você só pode remover suas próprias receitas!");

  if (confirm("Deseja realmente remover esta receita?")) {
    receitas = receitas.filter(r => r.id !== id);
    localStorage.setItem("receitas", JSON.stringify(receitas));
    listarReceitas();
  }
}

function limparFormulario() {
  document.getElementById("receita-id").value = "";
  document.getElementById("titulo").value = "";
  document.getElementById("ingredientes").value = "";
  document.getElementById("modoPreparo").value = "";
  document.getElementById("form-title").innerText = "Adicionar Receita";
}

listarReceitas();