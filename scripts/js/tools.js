// Render tools as smaller, more visible badge images
fetch('json/tools.json')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.skills-descriptions');
    if (!container || !data || !Array.isArray(data.tools)) return;

    const section = document.createElement('div');
    section.className = 'mb-6';

    const heading = document.createElement('h3');
    heading.className = 'text-xl font-semibold text-white mb-4';
    heading.textContent = 'Tools & Platforms';

    const badgeContainer = document.createElement('div');
    badgeContainer.className = 'flex flex-wrap gap-2 justify-center';

    data.tools.forEach(tool => {
      const badgeWrapper = document.createElement('div');
      badgeWrapper.className = 'transform hover:scale-105 transition-transform duration-200';
      
      const img = document.createElement('img');
      img.src = tool.src;
      img.alt = tool.alt;
      img.className = 'h-6 w-auto rounded shadow-sm'; // Smaller height (24px)
      img.style.maxWidth = '120px'; // Limit max width
      
      badgeWrapper.appendChild(img);
      badgeContainer.appendChild(badgeWrapper);
    });

    section.appendChild(heading);
    section.appendChild(badgeContainer);
    container.appendChild(section);
  })
  .catch(error => console.error('Error fetching tools.json:', error));