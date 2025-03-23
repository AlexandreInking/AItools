// Simulamos las 3 herramientas disponibles
const toolsData = [
  {
    id: "wordCounter",
    name: "Word Counter",
    description: "Cuenta las palabras en tu texto.",
    isFavorite: false
  },
  {
    id: "summarizer",
    name: "Summarizer",
    description: "Resume el contenido de tus textos.",
    isFavorite: false
  },
  {
    id: "localResearch",
    name: "Local Research",
    description: "Realiza investigaciones locales con IA.",
    isFavorite: false
  }
];

// Variables para el infinite scroll
let currentPage = 0;
let isLoading = false;

document.addEventListener('DOMContentLoaded', function() {
  // Carga inicial de herramientas
  loadMoreTools();

  // Configuración del infinite scroll
  window.addEventListener('scroll', function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && !isLoading) {
      loadMoreTools();
    }
  });

  // Configuración del switch para tema oscuro/claro
  const themeCheckbox = document.getElementById('themeCheckbox');
  themeCheckbox.addEventListener('change', function() {
    document.body.classList.toggle('dark-theme', this.checked);
  });
});

/**
 * Simula la carga paginada de herramientas.
 * Se replican las 3 herramientas disponibles asignando un identificador único.
 */
function loadMoreTools() {
  isLoading = true;
  // Simula un retardo en la carga (500ms)
  setTimeout(() => {
    // Genera una nueva tanda de herramientas con IDs únicos
    const newTools = toolsData.map((tool, index) => {
      const uniqueId = tool.id + "-" + (currentPage * toolsData.length + index);
      return {
        ...tool,
        uniqueId: uniqueId
      };
    });
    appendTools(newTools);
    currentPage++;
    isLoading = false;
  }, 500);
}

/**
 * Agrega nuevas tarjetas a la grid sin eliminar las existentes.
 */
function appendTools(tools) {
  const grid = document.getElementById('toolGrid');

  tools.forEach((tool, index) => {
    const card = document.createElement('div');
    card.classList.add('tool-card');
    card.dataset.toolId = tool.uniqueId;
    // Efecto de aparición escalonado
    card.style.animationDelay = `${index * 0.1}s`;

    const title = document.createElement('div');
    title.classList.add('tool-title');
    title.textContent = tool.name;

    const description = document.createElement('div');
    description.classList.add('tool-description');
    description.textContent = tool.description;

    const star = document.createElement('img');
    star.classList.add('favorite');
    star.src = tool.isFavorite ? 'images/star-filled.png' : 'images/star.png';
    star.alt = "Favorite";

    // Evita que el clic en la estrella active el clic de la tarjeta
    star.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleFavorite(tool.uniqueId, star);
    });

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(star);

    card.addEventListener('click', function() {
      if (window.pywebview) {
        window.pywebview.api.openTool(tool.uniqueId);
      } else {
        alert(`Abrir herramienta: ${tool.name}`);
      }
    });

    grid.appendChild(card);
  });
}

/**
 * Alterna el estado favorito de una tarjeta.
 */
function toggleFavorite(uniqueId, starElement) {
  if (starElement.src.includes('star-filled.png')) {
    starElement.src = 'images/star.png';
    if (window.pywebview) window.pywebview.api.unmarkFavorite(uniqueId);
  } else {
    starElement.src = 'images/star-filled.png';
    if (window.pywebview) window.pywebview.api.markFavorite(uniqueId);
  }
}
