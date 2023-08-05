import { useEffect,useState } from 'react';
import './App.css';
import Task from './Components/Task';
import TaskForm from './Components/TaskForm';

function App() {
  const[tasks,setTasks]=useState([]);
  useEffect(()=>{
    if (tasks.length===0)return;
  localStorage.setItem('tasks',JSON.stringify(tasks))
  },[tasks])
  useEffect(() =>{
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks);
  }, []);
  function addTasks(name){
    setTasks(prev=>{
      return [...prev,{name:name,done:false}];
    })
  }
  function removeTask(indexToDelete){
    setTasks(prev=>{
      return prev.filter((taskObject,index)=>{
        return index !==indexToDelete;
      });
    })

  }


  function UpdateTaskDone(taskIndex,newDone){
    setTasks(prev=>{
      const newTasks=[...prev];
      newTasks[taskIndex].done=newDone;
      return newTasks;

    });
  }

  const numberComplete = tasks.filter(t=>t.done).length;
    const numberTotal = tasks.length;

  function getMessage(){
    return'keep it';
  }

  function renameTask(index,newName){
    setTasks(prev=>{
      const newTasks= [...prev];
      newTasks[index].name = newName
      return[newTasks];
    })

  }


    

  
  return (
   <main>
    <h1>{numberComplete}/{numberTotal}  done </h1>
    <h2>{getMessage}</h2>
      <TaskForm onAdd={addTasks}/>
      {tasks.map((task,index)=>(
        <Task{...task}
        OnRename={newName=>setTasks(prev =>renameTask(index,newName))}
         onDelete={() =>removeTask(index)}
         onToggle={done=> UpdateTaskDone(index,done)}/>
      ))}
      <Task/>
      
    </main>
  );
}

export default App;
