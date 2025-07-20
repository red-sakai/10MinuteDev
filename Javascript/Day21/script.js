document.getElementById("submit").onclick = function() {
    let task = document.getElementById("data").value;
    if (task.trim() === "") return; // prevent adding empty tasks
    let list = document.getElementById("todolist");
    let li = document.createElement("li");
    li.textContent = task;
    list.appendChild(li);
    document.getElementById("data").value = ""; // clear input after adding
}