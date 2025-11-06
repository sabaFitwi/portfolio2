document.addEventListener("DOMContentLoaded", () => {
  fetch("json/cardsData.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const portfolioGrid = document.querySelector(".portfolio-grid");
      const techFiltersContainer =
        document.querySelector("#tech-filters");
      const projects = data.projects;

      // Extract unique technologies
      const allTechs = new Set();
      projects.forEach((project) => {
        const techs = project.tech.split(", ");
        techs.forEach((tech) => allTechs.add(tech.trim()));
      });

      // Create filter buttons
      Array.from(allTechs)
        .sort()
        .forEach((tech) => {
          const button = document.createElement("button");
          button.classList.add(
            "tech-filter",
            "px-3",
            "py-1.5",
            "text-sm",
            "text-gray-400",
            "border",
            "border-gray-700",
            "rounded-md",
            "hover:border-teal-500",
            "hover:text-teal-400",
            "transition-all",
            "duration-300"
          );
          button.setAttribute("data-tech", tech);
          button.textContent = tech;
          techFiltersContainer.appendChild(button);
        });

      // Add click handlers for filter buttons
      document.querySelectorAll(".tech-filter").forEach((button) => {
        button.addEventListener("click", () => {
          // Update active state
          document.querySelectorAll(".tech-filter").forEach((btn) => {
            btn.classList.remove(
              "active",
              "border-teal-500",
              "text-teal-400",
              "bg-teal-500/10"
            );
            btn.classList.add("border-gray-700", "text-gray-400");
          });
          button.classList.add(
            "active",
            "border-teal-500",
            "text-teal-400",
            "bg-teal-500/10"
          );
          button.classList.remove("border-gray-700", "text-gray-400");

          const selectedTech = button.getAttribute("data-tech");
          filterProjects(selectedTech);
        });
      });

      function filterProjects(tech) {
        portfolioGrid.innerHTML = ""; // Clear current projects

        const filteredProjects =
          tech === "all"
            ? projects
            : projects.filter((project) =>
                project.tech.includes(tech)
              );

        filteredProjects.forEach((project, index) => {
          const item = document.createElement("div");
          item.classList.add(
            "item",
            "scroll-down",
            `fade-in-bottom-${index + 1}`
          );
          item.innerHTML = `
            <div class="card-inner">
              <div class="card-front">
                <img src="${project.image}" alt="portfolio image" />
                <div class="card-overlay">
                  <h3 class="text-xl font-bold text-white mb-2">${
                    project.title
                  }</h3>
                  <div class="tech-badges">
                    ${project.tech
                      .split(", ")
                      .map(
                        (tech) =>
                          `<span class="tech-badge">${tech}</span>`
                      )
                      .join("")}
                  </div>
                </div>
              </div>
              <div class="card-back">
                <div class="content-wrapper">
                  <h3 class="text-xl font-bold text-white mb-4">${
                    project.title
                  }</h3>
                  <p class="text-white text-sm mb-4">${
                    project.description
                  }</p>
                  <div class="flex gap-4 justify-center">
                    <a href="${
                      project.github
                    }" class="project-btn github-btn">
                      <i class="fab fa-github mr-2"></i>GitHub
                    </a>
                    <a href="${
                      project.live_demo
                    }" class="project-btn demo-btn">
                      <!-- Inline SVG external-link icon to avoid relying on external icon fonts -->
                      <svg class="icon-external" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M14 3h7v7M21 3L10 14"/>
                        <rect x="3" y="8" width="11" height="13" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `;
          portfolioGrid.appendChild(item);
        });

        // Re-run the viewport check for new items
        handleScroll();
      }

      // Initial load - show all projects
      filterProjects("all");

      // Function to check if element is in viewport
      function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight ||
              document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth ||
              document.documentElement.clientWidth)
        );
      }

      // Function to handle scroll event
      function handleScroll() {
        const items = document.querySelectorAll(".scroll-down");
        items.forEach((item) => {
          if (isInViewport(item)) {
            item.classList.add("inView");
          }
        });
      }

      window.addEventListener("scroll", handleScroll);
    })
    .catch((error) => {
      console.error("Error loading JSON file:", error);
    });
});

// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle scroll event
