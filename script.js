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
    todayTasksContainer.innerHTML = "";
    futureTasksContainer.innerHTML = "";
    completedTasksContainer.innerHTML = "";
    
    // Render "Today's Tasks" section
    for (let i = 0; i < todayTasks.length; i++) {
      let item = todayTasks[i];
      
      let itemContainer = document.createElement("ul");
      itemContainer.classList.add("todo-item");
      
      let title=document.createElement('h2')
      title.innerHTML='Today\'s Todolist'
      itemContainer.appendChild(title)

      let itemName = document.createElement("li");
      itemName.innerHTML = item.name;
      itemContainer.appendChild(itemName);
      
      let itemDate = document.createElement("li");
      itemDate.innerHTML = item.date;
      itemContainer.appendChild(itemDate);
      
      let itemPriority = document.createElement("li");
      itemPriority.innerHTML = item.priority;
      itemContainer.appendChild(itemPriority);
      
      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", () => deleteItem(i));
      itemContainer.appendChild(deleteButton);

      let toggleButton = document.createElement("button");
      toggleButton.innerHTML = "Toggle";
      toggleButton.addEventListener("click", () => toggleCompleted(i));
      itemContainer.appendChild(toggleButton);
      
      todayTasksContainer.appendChild(itemContainer);
    }
  
    // Render "Future Tasks" section
    for (let i = 0; i < futureTasks.length; i++) {
      let item = futureTasks[i];
      
      let itemContainer = document.createElement("ul");
      itemContainer.classList.add("todo-item");

      let title=document.createElement('h2')
      title.innerHTML='Future\'s Todolist'
      futureTasksContainer.appendChild(title)
      
      let itemName = document.createElement("li");
      itemName.innerHTML = item.name;
      itemContainer.appendChild(itemName);
      
      let itemDate = document.createElement("li");
        itemDate.innerHTML = item.date;
        itemContainer.appendChild(itemDate);

        let itemPriority = document.createElement("li");
        itemPriority.innerHTML = item.priority;
        itemContainer.appendChild(itemPriority);


        let toggleButton = document.createElement("button");
        toggleButton.innerHTML = "Toggle";
        toggleButton.addEventListener("click", () => toggleCompleted(i));
        itemContainer.appendChild(toggleButton);

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", () => deleteItem(i));
        itemContainer.appendChild(deleteButton);

        futureTasksContainer.appendChild(itemContainer);

     } 

     for (let i = 0; i < completedTasks.length; i++) {
        let item = completedTasks[i];
        
        let itemContainer = document.createElement("ul");
        itemContainer.classList.add("todo-item");

        let title=document.createElement('h2')
        title.innerHTML='Completed\'s Todolist'
        itemContainer.appendChild(title)
        
        let itemName = document.createElement("li");
        itemName.innerHTML = item.name;
        itemContainer.appendChild(itemName);
        
        let itemDate = document.createElement("li");
          itemDate.innerHTML = item.date;
          itemContainer.appendChild(itemDate);
  
          let itemPriority = document.createElement("li");
          itemPriority.innerHTML = item.priority;
          itemContainer.appendChild(itemPriority);
  
          let deleteButton = document.createElement("button");
          deleteButton.innerHTML = "Delete";
          deleteButton.addEventListener("click", () => deleteItem(i));
          itemContainer.appendChild(deleteButton);
  
          completedTasksContainer.appendChild(itemContainer);
       } 

    }