async function loadProjects() {
    const response = await fetch('/api/projects');
    const projects = await response.json();

    const dropdown = document.getElementById("project-dropdown");

    projects.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.project_id;
        opt.textContent = p.project_name;
        dropdown.appendChild(opt);
    });
}
window.onload = loadProjects;