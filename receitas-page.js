// Lógica específica da página de receitas

let currentCategory = 'Todas';
let searchTerm = '';

document.addEventListener('DOMContentLoaded', function() {
  // Verificar se há categoria na URL
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('categoria');
  if (categoryParam) {
    currentCategory = categoryParam;
  }

  // Renderizar filtros de categoria
  renderCategoryFilters();
  
  // Renderizar receitas
  renderRecipes();
  
  // Event listener para busca
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      searchTerm = e.target.value.toLowerCase();
      renderRecipes();
    });
  }
});

// Renderizar filtros de categoria
function renderCategoryFilters() {
  const container = document.getElementById('categoriesFilter');
  if (!container) return;
  
  container.innerHTML = categories.map(category => `
    <button 
      class="category-btn ${category === currentCategory ? 'active' : ''}"
      onclick="filterByCategory('${category}')"
    >
      ${category}
    </button>
  `).join('');
}

// Filtrar por categoria
function filterByCategory(category) {
  currentCategory = category;
  
  // Atualizar URL
  if (category !== 'Todas') {
    window.history.pushState({}, '', `?categoria=${category}`);
  } else {
    window.history.pushState({}, '', window.location.pathname);
  }
  
  renderCategoryFilters();
  renderRecipes();
}

// Renderizar receitas filtradas
function renderRecipes() {
  const recipesGrid = document.getElementById('recipesGrid');
  const resultsCount = document.getElementById('resultsCount');
  const noResults = document.getElementById('noResults');
  
  if (!recipesGrid) return;
  
  // Filtrar receitas
  let filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = 
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm);
    
    const matchesCategory = 
      currentCategory === 'Todas' || 
      recipe.category === currentCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Atualizar contador
  if (resultsCount) {
    const count = filteredRecipes.length;
    resultsCount.textContent = `${count} ${count === 1 ? 'receita encontrada' : 'receitas encontradas'}`;
  }
  
  // Renderizar receitas ou mensagem de "sem resultados"
  if (filteredRecipes.length > 0) {
    recipesGrid.innerHTML = filteredRecipes.map(createRecipeCard).join('');
    recipesGrid.style.display = 'grid';
    if (noResults) noResults.style.display = 'none';
  } else {
    recipesGrid.style.display = 'none';
    if (noResults) noResults.style.display = 'block';
  }
}