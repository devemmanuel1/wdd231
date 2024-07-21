export function initializeModal() {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <div id="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => modal.style.display = 'none');

    window.addEventListener('click', event => {
        if (event.target === modal) modal.style.display = 'none';
    });
}

export function openModal(projectId) {
    const modal = document.getElementById('modal');
    fetch(`https://api.example.com/projects/${projectId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('modal-body').innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.content}</p>
            `;
            modal.style.display = 'block';
        })
        .catch(error => console.error('Error fetching project details:', error));
}
