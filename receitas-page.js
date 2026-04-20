let currentCategory = 'Todas';
let searchTerm = '';

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('categoria');
  if (categoryParam) {
    currentCategory = categoryParam;
  }

  renderCategoryFilters();

  renderRecipes();

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      searchTerm = e.target.value.toLowerCase();
      renderRecipes();
    });
  }
});

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

function filterByCategory(category) {
  currentCategory = category;

  if (category !== 'Todas') {
    window.history.pushState({}, '', `?categoria=${category}`);
  } else {
    window.history.pushState({}, '', window.location.pathname);
  }
  
  renderCategoryFilters();
  renderRecipes();
}

function renderRecipes() {
  const recipesGrid = document.getElementById('recipesGrid');
  const resultsCount = document.getElementById('resultsCount');
  const noResults = document.getElementById('noResults');
  
  if (!recipesGrid) return;

  let filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = 
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm);
    
    const matchesCategory = 
      currentCategory === 'Todas' || 
      recipe.category === currentCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (resultsCount) {
    const count = filteredRecipes.length;
    resultsCount.textContent = `${count} ${count === 1 ? 'receita encontrada' : 'receitas encontradas'}`;
  }

  if (filteredRecipes.length > 0) {
    recipesGrid.innerHTML = filteredRecipes.map(createRecipeCard).join('');
    recipesGrid.style.display = 'grid';
    if (noResults) noResults.style.display = 'none';
  } else {
    recipesGrid.style.display = 'none';
    if (noResults) noResults.style.display = 'block';
  }
}