document.addEventListener('DOMContentLoaded', () => {
    fetch('cardsData.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const portfolioGrid = document.querySelector('.portfolio-grid');
            const projects = data.projects;

            projects.forEach((project, index) => {
                const item = document.createElement('div');
                item.classList.add('item', 'scroll-down', `fade-in-bottom-${index + 1}`);
                item.innerHTML = `
                    <img src="${project.image}" alt="portfolio image" />
                    <div class="sub-item">
                        <h3>${project.title}</h3>
                        <p class="text">${project.description}</p>
                        <div>
                            <a href="${project.github}"><button><i class="fab fa-github"></i>GitHub</button></a>
                            <a href="${project.live_demo}"><button><i class="fal fa-external-link"></i>Live Demo</button></a>
                        </div>
                    </div>
                `;
                portfolioGrid.appendChild(item);
            });

            // Function to check if element is in viewport
            function isInViewport(element) {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }

            // Function to handle scroll event
            function handleScroll() {
                projects.forEach((project, index) => {
                    const item = portfolioGrid.querySelector(`.fade-in-bottom-${index + 1}`);
                    if (isInViewport(item)) {
                        item.classList.add('inView');
                    }
                });
            }

            
            window.addEventListener('scroll', handleScroll);

        
            handleScroll();
        })
        .catch(error => {
            console.error('Error loading JSON file:', error);
        });
});
