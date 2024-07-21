export async function fetchProjects() {
    const response = await fetch('https://api.example.com/projects');
    if (!response.ok) throw new Error('Failed to fetch projects');
    return await response.json();
}
