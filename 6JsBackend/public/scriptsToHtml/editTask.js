document.addEventListener("DOMContentLoaded", async () => {
    const id = window.location.pathname.split("/").pop();

    const descriptionInput = document.getElementById("description");
    const statusInput = document.getElementById("status");
    const projectDropdown = document.getElementById("project_fk");
    const form = document.getElementById("editForm");

    // load projects
    const projects = await fetch("/api/projects").then(r => r.json());
    projects.forEach(p => {
        const option = document.createElement("option");
        option.value = p.project_id;
        option.textContent = p.project_name;
        projectDropdown.appendChild(option);
    });

    // load the task
    const task = await fetch(`/api/tasks/${id}`).then(r => r.json());

    descriptionInput.value = task.description;
    statusInput.value = task.status;
    projectDropdown.value = task.project_fk;

    // submit update
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const payload = {
            description: descriptionInput.value,
            status: statusInput.value,
            project_fk: projectDropdown.value
        };

        const res = await fetch(`/api/tasks/${id}/update`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            window.location.href = "/";
        } else {
            const error = await res.json();
            alert("Error: " + error.error);
        }
    });
});
