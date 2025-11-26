document.addEventListener("DOMContentLoaded", () => {
    fetchData();

    setInterval(fetchData, 3000);

    async function fetchData() {
        try{
            const response = await fetch("/status");
            const data = await response.json();

            document.getElementById("cpu").textContent = `${data.cpu}%`;
            document.getElementById("ram").textContent = `${data.ram / 1000} GB`;
            document.getElementById("users").textContent = `${data.users}`;
            document.getElementById("time").textContent = data.time;

            const cpuStatus = document.getElementById("cpu-status");
            if (data.cpu > 85) {
                cpuStatus.style.backgroundColor = "rgba(224,24,24,0.91)";
            } else {
                cpuStatus.style.backgroundColor = "rgba(10,171,10,0.91)";
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            document.getElementById("time").textContent = "There is no connection to the server.";
        }
    }
});