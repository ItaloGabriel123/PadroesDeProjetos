// Lógica específica da página de detalhes da receita

document.addEventListener('DOMContentLoaded', function() {
  // Obter ID da receita da URL
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('id');
  
  if (!recipeId) {
    window.location.href = 'receitas.html';
    return;
  }
  
  // Buscar receita
  const recipe = recipes.find(r => r.id === recipeId);
  
  if (!recipe) {
    window.location.href = 'receitas.html';
    return;
  }
  
  // Renderizar receita
  renderRecipeHeader(recipe);
  renderRecipeStats(recipe);
  renderIngredients(recipe);
  renderInstructions(recipe);
  renderRelatedRecipes(recipe);
  
  // Atualizar título da página
  document.title = `${recipe.title} - Delícias da Cozinha`;
});

// Renderizar cabeçalho da receita
function renderRecipeHeader(recipe) {
  const container = document.getElementById('recipeHeader');
  if (!container) return;
  
  container.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe-header-image">
    <div class="recipe-header-overlay"></div>
    <div class="recipe-header-content">
      <div class="container">
        <span class="recipe-header-category">${recipe.category}</span>
        <h1 class="recipe-header-title">${recipe.title}</h1>
        <p class="recipe-header-description">${recipe.description}</p>
      </div>
    </div>
  `;
}

// Renderizar estatísticas da receita
function renderRecipeStats(recipe) {
  const container = document.getElementById('recipeStats');
  if (!container) return;
  
  container.innerHTML = `
    <div class="stat-box">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      <div class="stat-value">${recipe.prepTime} min</div>
      <p class="stat-label">Tempo de Preparo</p>
    </div>
    <div class="stat-box">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
      <div class="stat-value">${recipe.servings}</div>
      <p class="stat-label">Porções</p>
    </div>
    <div class="stat-box">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
        <line x1="6" y1="17" x2="18" y2="17"/>
      </svg>
      <div>
        <span class="difficulty-badge ${getDifficultyClass(recipe.difficulty)}">
          ${recipe.difficulty}
        </span>
      </div>
      <p class="stat-label">Dificuldade</p>
    </div>
    <div class="stat-box">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
      <div class="stat-value">${recipe.ingredients.length}</div>
      <p class="stat-label">Ingredientes</p>
    </div>
  `;
}

// Renderizar ingredientes
function renderIngredients(recipe) {
  const container = document.getElementById('ingredientsList');
  if (!container) return;
  
  container.innerHTML = recipe.ingredients.map(ingredient => `
    <li>${ingredient}</li>
  `).join('');
}

// Renderizar instruções
function renderInstructions(recipe) {
  const container = document.getElementById('instructionsList');
  if (!container) return;
  
  container.innerHTML = recipe.instructions.map(instruction => `
    <li><p>${instruction}</p></li>
  `).join('');
}

// Renderizar receitas relacionadas
function renderRelatedRecipes(recipe) {
  const container = document.getElementById('relatedRecipes');
  if (!container) return;
  
  // Buscar receitas da mesma categoria
  const related = recipes
    .filter(r => r.category === recipe.category && r.id !== recipe.id)
    .slice(0, 3);
  
  if (related.length === 0) {
    container.style.display = 'none';
    return;
  }
  
  container.innerHTML = `
    <h2 class="section-title">Você também pode gostar</h2>
    <div class="recipes-grid">
      ${related.map(r => `
        <a href="receita-detalhe.html?id=${r.id}" class="recipe-card">
          <div class="recipe-card-image">
            <img src="${r.image}" alt="${r.title}">
          </div>
          <div class="recipe-card-content">
            <h3 class="recipe-title">${r.title}</h3>
            <p class="recipe-description">${r.description}</p>
          </div>
        </a>
      `).join('')}
    </div>
  `;
}
