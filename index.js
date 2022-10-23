window.addEventListener("load", function(){
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const listEl = document.querySelector("#tasks");
    let toDoItems = [];
  


  
   
 
   
   form.addEventListener("submit", function(e){
    e.preventDefault();
        addToDo(input.value);  
 });



    function addToDo(item){
        
        if(item !== ""){
        
           const toDoItem = {
      id: Date.now(),
      name: item,
      completed: false
    };
         toDoItems.push(toDoItem)
       addToLocalStorage(toDoItems) }
      
        console.log(toDoItems);

        input.value = "";
    }
 
    function renderTodos(toDoItems){
        listEl.innerHTML = "";

        toDoItems.forEach(function(item) {
        const checked = item.completed ? 'checked': null;

        const taskEl = document.createElement("div");
        taskEl.classList.add("task");
        

       
        const contentEl = document.createElement("div");
        contentEl.classList.add("content");
        contentEl.setAttribute("data-key", item.id);
        taskEl.appendChild(contentEl);

       
       

        const actionsEl = document.createElement("div");
        actionsEl.classList.add("actions");
        actionsEl.setAttribute("data-key", item.id)
        taskEl.appendChild(actionsEl);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.innerText = "delete";

        actionsEl.appendChild(deleteBtn)
         if (item.completed === true) {
      contentEl.classList.add('checked');
    }
        
         contentEl.innerHTML = ` <input type="checkbox" ${checked}  class="text"/>
            <p> ${item.name}</p>`;

     
            listEl.append(taskEl) 

    });
 }
 function addToLocalStorage(toDoItems) {
  
  localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
  
  renderTodos(toDoItems);
}
function getFromLocalStorage() {
  const reference = localStorage.getItem('toDoItems');
  
  if (reference) {
   
    toDoItems = JSON.parse(reference);
    renderTodos(toDoItems);
  }
}

getFromLocalStorage();

listEl.addEventListener("click", function(e){
     if (e.target.type === 'checkbox') {
    toggle(e.target.parentElement.getAttribute('data-key'));
  }
   if (e.target.classList.contains("delete")) {
   
    deleteItems(e.target.parentElement.getAttribute('data-key'));
  }
})
function toggle(id) {
  toDoItems.forEach(function(item) {
   
    if (item.id == id) {
      
      item.completed = !item.completed;
    }  
  });
  addToLocalStorage(toDoItems); }
  function deleteItems(id) {
  
  toDoItems = toDoItems.filter(function(item) {
  
    return item.id != id;
  });

  addToLocalStorage(toDoItems);
}
});