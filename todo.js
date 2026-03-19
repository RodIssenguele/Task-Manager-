// Task's Variables  ----------- >
let tasksToDo = [];
let doneTasks = [];


// task filter --------- >
let priority = false;


// date variable to compare with the day os the task -------->
let date = '';

// display memory calling function -----> 
displayMemory();


// start section function's ------>
function updateClock(){
  const now = new Date();

  let hour = now.getHours();
  let min = now.getMinutes();
  let sec = now.getSeconds();

  min = min.toString().padStart(2, "0");
  sec = sec.toString().padStart(2, "0");
  hour = hour.toString().padStart(2, "0");


  document.querySelector('.js-hour').innerHTML = `${hour}:${min}:${sec}`
  
  

}

updateClock();
setInterval(updateClock, 1000);




function updateDate(){
  const now = new Date();

  let monthDay = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();

  month = month.toString().padStart(2,"0");
  monthDay = monthDay.toString().padStart(2,"0");

  document.querySelector('.js-date').
    innerHTML = `${monthDay}/${month}/${year}`;

   date = `${year}-${month}-${monthDay}`;
   
}

updateDate();
setInterval(updateDate, 10000);





function updateWeekDay(){
  const now = new Date();

  let weekday = now.toLocaleString("en-US", {weekday : "long"});

  document.querySelector('.js-weekday').
    innerHTML = `${weekday}`

}

updateWeekDay();
setInterval(updateWeekDay, 10000);

// date format for render -----> 

function formatDate(date){
  if (!date){
    return ''
  }

  const [year, month, monthDay] = date.split('-');

  return `${monthDay}-${month}-${year}` 
}







// render tasks function ------- >

render();


function render(){

  let todayhtml = ''; 
  let futurehtml = ''; 
  let overduehtml = ''; 
  let todayPriorityhtml = ''; 
  let futurePriorityhtml = ''; 
  let overduePriorityhtml = ''; 
  const star = '⭐';

  let todayDate = date;

  for(let i = 0; i < tasksToDo.length; i++){

    const tasks = tasksToDo[i]; 
    const name = tasks.name
    const dueDate = tasks.dueDate;
    const dueDateFormatted = formatDate(dueDate) 
    let prioritycheck = tasks.priority;

    if (prioritycheck === false){
    
      const html = `
          <div class="single-task-container">
          <p class="task-name">${name}</p> <p class="task-date">${dueDateFormatted}</p> 
          <button 
          onclick="doneTasks.push(tasksToDo[${i}]);
          tasksToDo.splice(${i}, 1);
          setMemory();
          checktask();
          render();" 
          class="done-button task-btn btn">Done
          </button>
          <button onclick="editTask(tasksToDo,${i})" class="edit-button task-btn btn">Edit</button>
          <button class="delete-button task-btn btn" onclick="tasksToDo.splice(${i}, 1); render(); setMemory();">Delete</button>
          </div>`;

  
      if(todayDate === dueDate){
          todayhtml += html;
        
        } else if(todayDate < dueDate){
          futurehtml +=html;
        
        } else{
          overduehtml += html;
      }
    } else {

      const htmlPriority = 
        `<div class="task-name-priority single-task-container">
          <p class="star">${star}</p>
          <p class="priority-task-name">${name}</p> 
          <p class="task-date">${dueDateFormatted}</p> 
          <button 
          onclick="doneTasks.push(tasksToDo[${i}]);
          tasksToDo.splice(${i}, 1);
          setMemory();
          checktask();
          render();" 
          class="done-button task-btn btn">Done
          </button>
          <button onclick="editTask(tasksToDo,${i})" class="edit-button task-btn btn">Edit</button>
          <button class="delete-button task-btn btn" onclick="tasksToDo.splice(${i}, 1); render(); setMemory();">Delete</button>
         </div>`;

  
      if(todayDate === dueDate){
          todayPriorityhtml += htmlPriority;
        
        } else if(todayDate < dueDate){
          futurePriorityhtml += htmlPriority;
        
        } else{
          overduePriorityhtml += htmlPriority;
      }
    }

  }

  const todayCombinedHtml = `${todayPriorityhtml}${todayhtml}`;
  const futureCombinedHtml = `${futurePriorityhtml}${futurehtml}`;
  const overdueCombinedHtml = `${overduePriorityhtml}${overduehtml}`;

  if (todayCombinedHtml === ''){
    document.querySelector('.container-today-tasks')
    .innerHTML = `<p class="place-holder">No tasks for Today</p>`;
  } else {
    document.querySelector('.container-today-tasks')
    .innerHTML = `${todayCombinedHtml}`;
  }

  if(futureCombinedHtml === ''){
    document.querySelector('.container-future-tasks')
    .innerHTML = `<p class="place-holder">No tasks for the Future</p>`
  } else {
    document.querySelector('.container-future-tasks')
    .innerHTML = `${futureCombinedHtml}`;
  }
    
 if(overdueCombinedHtml === ''){
  document.querySelector('.container-overdue-tasks')
    .innerHTML = `<p class="place-holder">No Overdue tasks</p>`
 } else {
  document.querySelector('.container-overdue-tasks')
    .innerHTML = `${overdueCombinedHtml}`;
 }
    
  
        
};


// function change the data from toDoList array to doneTasks array ----------> 

checktask();


function checktask(){

  let textDone = '';
  
  for (let i = 0; i < doneTasks.length; i++){

    const task = doneTasks[i];

    const name = task.name;
    const date = task.dueDate;
    const dueDateFormatted = formatDate(date);

    const html = `
    <div class="single-task-container">
    <p class="task-name">${name} is Done</p>
    <p class="task-date">${dueDateFormatted}</p>
    <button onclick="editTask(doneTasks,${i})" class="edit-button task-btn btn">Edit</button>
    <button class="delete-button task-btn btn" onclick="doneTasks.splice(${i}, 1); setMemory(); checktask(); ">Delete</button>
    <button class="undone-button task-btn btn" onclick="tasksToDo.push(doneTasks[${i}]); doneTasks.splice(${i}, 1); setMemory(); render();  checktask();">Undo</button>
    </div>`;

    textDone += html
  }

  if(textDone === ''){
    document.querySelector('.container-done-tasks')
    .innerHTML = `<p class="place-holder">No Done tasks</p>`;
  } else {
    document.querySelector('.container-done-tasks')
    .innerHTML = textDone;
  }

    
}


// Edit Task-------------------->

let editingIndex = null;
let editingArray = null;



function editTask(array, index){

  
  document.querySelector('.js-task-input').value = array[index].name ;
  document.querySelector('.js-date-input').value = array[index].dueDate;
  priority = array[index].priority;
  

  editingArray = array;
  editingIndex = index;
 
  seeBtnToggle();

}

// function to update the dates render updated data --------------> 

function updateTheDate(){

  const newdate = new Date();
  let currentDate =  '';

  let monthDay = newdate.getDate();
  let month = newdate.getMonth() + 1;
  let year = newdate.getFullYear();

  month = month.toString().padStart(2,"0");
  monthDay = monthDay.toString().padStart(2,"0");

  currentDate = `${year}-${month}-${monthDay}`;

  if (currentDate !== date){
    updateDate();
    render();
    updateWeekDay();
  }

}

updateTheDate();
setInterval(updateTheDate, 10000);




// function to add a new task  ------------------ > 


function addToDo(){

  const inputTask = document.querySelector('.js-task-input');
  const inputDate = document.querySelector('.js-date-input'); 

  const name = inputTask.value;
  const dueDate = inputDate.value;
  
  if (name === '' || dueDate === ''){
    return 
  }

  
  if (editingIndex !== null && editingArray !== null){
    
    editingArray[editingIndex].name = name;
    editingArray[editingIndex].dueDate = dueDate;
    editingArray[editingIndex].priority = priority;  
    
  }else{
    tasksToDo.push({name: name, dueDate: dueDate, priority: priority});
  }
    
  
  editingIndex = null;
  editingArray = null;

  inputTask.value = '';
  inputDate.value = '';
  priority = false;

  setMemory();
  render();
  seeBtnToggle();
};


function prioritybtn(){
  
  if(priority === true){
    priority = false
    
  } else if (priority === false) {
    priority = true
  }
}

function seeBtnToggle(){

  if(priority === true){
    document.getElementById('priority-toggle').className = 'toggle-on';
  } else {
    document.getElementById('priority-toggle').className = 'toggle-off';

  }
}



// functions for the mememory ----------> 

function setMemory(){

  localStorage.setItem('tasksToDo', JSON.stringify(tasksToDo));

  localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
};


function displayMemory(){

  tasksToDo = JSON.parse(localStorage.getItem('tasksToDo'));

  doneTasks = JSON.parse(localStorage.getItem('doneTasks'));

  if (tasksToDo === null ){
    tasksToDo = [];
    
  }

  if(doneTasks === null){
    doneTasks = [];
  }

};

