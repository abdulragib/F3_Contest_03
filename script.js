// Get to-do list from localStorage
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

// Add item function
function addItem() {
  // Get input values
  let name = document.getElementById("itemName").value;
  let date = document.getElementById("itemDate").value;
  let priority = document.getElementById("itemPriority").value;
  
  // Create item object
  let item = {
    name: name,
    date: date,
    priority: priority,
    completed: false
  }
  
  // Add item to to-do list array
  todoList.push(item);
  
  // Update localStorage
  localStorage.setItem("todoList", JSON.stringify(todoList));
  
  // Clear input fields
  document.getElementById("itemName").value = "";
  document.getElementById("itemDate").value = "";
  document.getElementById("itemPriority").value = "";
  
  // Render the to-do list items
  renderTodoList();
}

const add=document.getElementById('add')
add.addEventListener('click',addItem)

// Delete item function
function deleteItem(index) {
  // Remove item from array
  todoList.splice(index, 1);
  
  // Update localStorage
  localStorage.setItem("todoList", JSON.stringify(todoList));
  
  // Render the to-do list items
  renderTodoList();
}

// Toggle completed status function
function toggleCompleted(index) {
  // Toggle completed status
  todoList[index].completed = !todoList[index].completed;
  
  // Update localStorage
  localStorage.setItem("todoList", JSON.stringify(todoList));
  
  // Render the to-do list items
  renderTodoList();
}

// Render to-do list function
function renderTodoList() {
    // Get today's date
    let today = new Date().toISOString().slice(0, 10);
    console.log(today)
    
    // Filter items for "Today's Tasks" section
    let todayTasks = todoList.filter(item => item.date === today);
    
    // Filter items for "Future Tasks" section
    let futureTasks = todoList.filter(item => item.date > today);
    
    // Filter items for "Completed Tasks" section
    let completedTasks = todoList.filter(item => item.completed === true);
    
    // Get the containers for each section
    let todayTasksContainer = document.getElementById("current_todo");
    let futureTasksContainer = document.getElementById("future_todo");
    let completedTasksContainer = document.getElementById("completed_todo");
    
    // Clear existing items from the containers
    todayTasksContainer.innerHTML += "";
    futureTasksContainer.innerHTML += "";
    completedTasksContainer.innerHTML += "";
    
    // Render "Today's Tasks" section
    for (let i = 0; i < todayTasks.length; i++) {
      let item = todayTasks[i];

      let itemContainer = document.createElement("ul");

      itemContainer.innerHTML =`
      <li>${i+1} ${item.name}</li>
      <li>${item.date}</li>
      <li>${item.priority}</li>
      <button onclick="deleteItem(${i})">Delete</button>
      <button onclick="toggleCompleted(${i})">Toggle</button>
      `
      
      todayTasksContainer.appendChild(itemContainer);
    }
  
    // Render "Future Tasks" section
    for (let i = 0; i < futureTasks.length; i++) {
      let item = futureTasks[i];
      
      let toggleButton = document.createElement("button");
      toggleButton.innerHTML = "Toggle";
      toggleButton.addEventListener("click", () => toggleCompleted(i));
  

      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", () => deleteItem(i));

      let itemContainer = document.createElement("ul");
      
      itemContainer.innerHTML =`
      <li>${i+1} ${item.name}</li>
      <li>${item.date}</li>
      <li>${item.priority}</li>
      <button onclick="deleteItem(${i})">Delete</button>
      <button onclick="toggleCompleted(${i})">Toggle</button>
      `

        futureTasksContainer.appendChild(itemContainer);

     } 

     for (let i = 0; i < completedTasks.length; i++) {
        let item = completedTasks[i];

        let deleteButton = document.createElement("button");
          deleteButton.innerHTML = "Delete";
          deleteButton.addEventListener("click", () => deleteItem(i));
        
        let itemContainer = document.createElement("ul");
        itemContainer.classList.add("done")

        itemContainer.innerHTML =`
      <li>${i+1} ${item.name}</li>
      <li>${item.date}</li>
      <button onclick="deleteItem(${i})">Delete</button>
      <li>${deleteButton.outerHTML}</li>
      `
  
          completedTasksContainer.appendChild(itemContainer);
       } 

    }