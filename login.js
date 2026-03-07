// Array de usuários (simulado)
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
  { id: 1, nome: "Maria", email: "maria@email.com", senha: "123", tipo: "usuario" },
  { id: 2, nome: "Dr. Ana", email: "ana@email.com", senha: "123", tipo: "nutricionista" }
];

localStorage.setItem("usuarios", JSON.stringify(usuarios));

function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const tipo = document.getElementById("tipo").value;

  const usuario = usuarios.find(u => u.email === email && u.senha === senha && u.tipo === tipo);

  if (usuario) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    window.location.href = "index.html";
  } else {
    alert("Email, senha ou tipo incorreto!");
  }
}

function criarConta() {
  const nome = document.getElementById("nomeCadastro").value;
  const email = document.getElementById("emailCadastro").value;
  const senha = document.getElementById("senhaCadastro").value;
  const tipo = document.getElementById("tipoCadastro").value;

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  // Checa se o email já existe
  if (usuarios.some(u => u.email === email)) {
    alert("Este email já está cadastrado!");
    return;
  }

  const novoUsuario = {
    id: Date.now(),
    nome,
    email,
    senha,
    tipo
  };

  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Conta criada com sucesso! Agora faça login.");
  
  // Limpa o formulário de cadastro
  document.getElementById("nomeCadastro").value = "";
  document.getElementById("emailCadastro").value = "";
  document.getElementById("senhaCadastro").value = "";
  document.getElementById("tipoCadastro").value = "usuario";
}