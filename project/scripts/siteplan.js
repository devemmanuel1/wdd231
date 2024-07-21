import { fetchProjects } from './modules/fetchProjects.js';
import { handleFormSubmit } from './modules/formHandler.js';
import { initializeModal } from './modules/modal.js';

const recentProjectsSection = document.getElementById('recent-projects');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const projects = await fetchProjects();
        renderProjects(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
});

function renderProjects(projects) {
    recentProjectsSection.innerHTML = projects.map(project => `
        <div class="project">
            <h2>${project.title}</h2>
            <p>${project.excerpt}</p>
            <button onclick="openModal(${project.id})">Read More</button>
        </div>
    `).join('');
}

initializeModal();

const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}
