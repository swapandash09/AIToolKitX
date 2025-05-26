document.addEventListener('DOMContentLoaded', () => {
  // Debounce function to optimize search performance
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Search Functionality
  const searchInput = document.getElementById('toolSearch');
  const toolsGrid = document.getElementById('toolsGrid');
  const tools = toolsGrid ? Array.from(toolsGrid.children) : [];

  const filterTools = debounce(() => {
    if (!toolsGrid) return;
    const query = searchInput.value.toLowerCase();
    tools.forEach(tool => {
      const title = tool.querySelector('h3').textContent.toLowerCase();
      tool.style.display = title.includes(query) ? 'block' : 'none';
    });
  }, 300);

  if (searchInput) {
    searchInput.addEventListener('input', filterTools);
  }

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('darkMode', document.body.classList.contains('dark'));
    });
  }

  // Sidebar Toggle for Mobile
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
    });
  }

  // Initialize dark mode based on user preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }

  // Initialize VanillaTilt for tool cards
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 15,
      speed: 400,
      glare: true,
      'max-glare': 0.5
    });
  }
});