let receitas = JSON.parse(localStorage.getItem("receitas")) || [];

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
            r.id == id ? { id: Number(id), titulo, ingredientes, modoPreparo } : r
        );
    } else {
        const novaReceita = {
            id: Date.now(),
            titulo,
            ingredientes,
            modoPreparo
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

    receitas.forEach(receita => {
        const div = document.createElement("div");
        div.className = "receita-card";

        div.innerHTML = `
            <h3>${receita.titulo}</h3>
            <p><strong>Ingredientes:</strong><br>${receita.ingredientes}</p>
            <p><strong>Modo de Preparo:</strong><br>${receita.modoPreparo}</p>
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

    const filtradas = receitas.filter(receita =>
        receita.titulo.toLowerCase().includes(termo) ||
        receita.ingredientes.toLowerCase().includes(termo) ||
        receita.modoPreparo.toLowerCase().includes(termo)
    );

    filtradas.forEach(receita => {
        const div = document.createElement("div");
        div.className = "receita-card";

        div.innerHTML = `
            <h3>${receita.titulo}</h3>
            <p><strong>Ingredientes:</strong><br>${receita.ingredientes}</p>
            <p><strong>Modo de Preparo:</strong><br>${receita.modoPreparo}</p>
            <button onclick="editarReceita(${receita.id})">Editar</button>
            <button onclick="removerReceita(${receita.id})">Remover</button>
        `;

        lista.appendChild(div);
    });
}

function editarReceita(id) {
    const receita = receitas.find(r => r.id === id);

    document.getElementById("receita-id").value = receita.id;
    document.getElementById("titulo").value = receita.titulo;
    document.getElementById("ingredientes").value = receita.ingredientes;
    document.getElementById("modoPreparo").value = receita.modoPreparo;

    document.getElementById("form-title").innerText = "Editar Receita";
}

function removerReceita(id) {
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