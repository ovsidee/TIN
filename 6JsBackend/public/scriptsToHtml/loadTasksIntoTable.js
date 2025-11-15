async function loadTasks(){
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    const tbodyFromHTML = document.getElementById("tableWithAllTasks");

    tasks.forEach(t => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
                    <td>${t.task_id}</td>
                    <td>${t.description}</td>
                    <td>${t.status}</td>
                    <td>${t.project_name ?? '(none)'}</td>
                    <td>${t.created_at}</td>
                    <td><a class="btn update" href="/tasks/edit/${t.task_id}">Update</a></td>
                    <td><a class="btn delete" href="/tasks/delete/${t.task_id}">Delete</a></td>
                `;

        tbodyFromHTML.appendChild(tr);
    });
}
window.onload = loadTasks;