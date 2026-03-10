// Funções gerais compartilhadas

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
    });
  }

  // Carregar receitas na página inicial se existir
  if (document.getElementById('featuredRecipes')) {
    loadFeaturedRecipes();
  }
  
  if (document.getElementById('popularRecipes')) {
    loadPopularRecipes();
  }
});

// Função para obter classe de dificuldade
function getDifficultyClass(difficulty) {
  const map = {
    'Fácil': 'difficulty-facil',
    'Médio': 'difficulty-medio',
    'Difícil': 'difficulty-dificil'
  };
  return map[difficulty] || 'difficulty-facil';
}

// Criar HTML de um card de receita
function createRecipeCard(recipe) {
  return `
    <a href="receitas-detalhe.html?id=${recipe.id}" class="recipe-card">
      <div class="recipe-card-image">
        <img src="${recipe.image}" alt="${recipe.title}">
        <span class="difficulty-badge ${getDifficultyClass(recipe.difficulty)}">
          ${recipe.difficulty}
        </span>
      </div>
      <div class="recipe-card-content">
        <span class="recipe-category">${recipe.category}</span>
        <h3 class="recipe-title">${recipe.title}</h3>
        <p class="recipe-description">${recipe.description}</p>
        <div class="recipe-meta">
          <div class="recipe-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>${recipe.prepTime} min</span>
          </div>
          <div class="recipe-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>${recipe.servings} porções</span>
          </div>
        </div>
      </div>
    </a>
  `;
}

// Carregar receitas em destaque
function loadFeaturedRecipes() {
  const container = document.getElementById('featuredRecipes');
  if (!container) return;
  
  const featured = recipes.filter(r => r.featured);
  container.innerHTML = featured.map(createRecipeCard).join('');
}

// Carregar receitas populares
function loadPopularRecipes() {
  const container = document.getElementById('popularRecipes');
  if (!container) return;
  
  const popular = recipes.slice(0, 6);
  container.innerHTML = popular.map(createRecipeCard).join('');
}
