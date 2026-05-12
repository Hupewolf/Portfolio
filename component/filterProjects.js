// Filter Projects by Technology
let selectedTech = "all";
let filterInitialized = false;

function initFilterDropdown() {
    if (filterInitialized) return;
    filterInitialized = true;
    
    const techFilter = document.getElementById("techFilter");
    const techDropdown = document.getElementById("techDropdown");
    
    if (!techFilter || !techDropdown) return;

    const dropdownItems = document.querySelectorAll(".dropdown-item");

    // Toggle dropdown menu
    techFilter.addEventListener("click", (e) => {
        e.stopPropagation();
        techFilter.classList.toggle("active");
        techDropdown.classList.toggle("show");
    });

    // Handle dropdown item selection
    dropdownItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.stopPropagation();
            const selectedValue = item.getAttribute("data-tech");
            selectedTech = selectedValue.toLowerCase().replace(/\s+/g, '');

            // Update active state
            dropdownItems.forEach((el) => el.classList.remove("active"));
            item.classList.add("active");

            // Update filter text
            const filterText = item.textContent;
            techFilter.innerHTML = `${filterText}<div class="down"></div>`;

            // Filter projects
            filterProjects(selectedTech);

            // Close dropdown
            techFilter.classList.remove("active");
            techDropdown.classList.remove("show");
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!techFilter.contains(e.target) && !techDropdown.contains(e.target)) {
            techFilter.classList.remove("active");
            techDropdown.classList.remove("show");
        }
    });
}

// Filter projects based on selected technology
function filterProjects(tech) {
    const projectCards = document.querySelectorAll(".pcard");
    
    projectCards.forEach((card) => {
        const techs = card.getAttribute("data-techs")?.split(",") || [];

        if (tech === "all" || techs.includes(tech.toLowerCase().replace(/\s+/g, ''))) {
            card.style.display = "block";
            card.style.animation = "fadeIn 0.3s ease";
        } else {
            card.style.display = "none";
        }
    });
}

// Add fade-in animation
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize filter dropdown when DOM is ready
document.addEventListener("DOMContentLoaded", initFilterDropdown);
