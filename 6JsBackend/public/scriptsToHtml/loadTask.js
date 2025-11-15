async function loadTask() {
    const id = window.location.pathname.split("/").pop();
    const response = await fetch(`/api/tasks/${id}`);
    const task = await response.json();

    document.getElementById("task-info").textContent = `Task ${task.task_id}: "${task.description}"`;
    document.getElementById("delete-form").action = `/tasks/delete/${task.task_id}`;
}
window.onload = loadTask;