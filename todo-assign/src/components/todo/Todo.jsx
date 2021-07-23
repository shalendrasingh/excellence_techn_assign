import React, { useState, useEffect } from "react";
import "./Todo.css";

// code for fetching data from localstorage with conditionally checked

const getLocalData = () => {
   const lists = localStorage.getItem("mytodolist");
   if (lists) {
      return JSON.parse(lists);
   } else {
      return [];
   }
};

const Todo = () => {
   const [inputData, setInputData] = useState("");
   const [items, setItems] = useState(getLocalData());
   const [isEditItem, setIsEditItem] = useState("");
   const [toggleButton, setToggleButton] = useState(false);
   const handleChange = (e) => {
      setInputData(e.target.value);
   };

   //    code for add todo

   const addItem = () => {
      if (!inputData) {
         alert("please write something");
      } else if (inputData && toggleButton) {
         setItems(
            items.map((todo) => {
               if (todo.id === isEditItem) {
                  return { ...todo, name: inputData };
               }
               return todo;
            })
         );
         setInputData([]);
         setIsEditItem(null);
         setToggleButton(false);
      } else {
         const payload = {
            id: new Date().getTime().toString(),
            name: inputData,
         };
         setItems([...items, payload]);
         setInputData("");
      }
   };

   // code for edit items

   const handleEdit = (id) => {
      const item_todo_edit = items.find((todo) => {
         return todo.id === id;
      });
      setInputData(item_todo_edit.name);
      setIsEditItem(id);
      setToggleButton(true);
   };

   //    code for delete items

   const handleDelete = (id) => {
      const updatedItem = items.filter((todo) => {
         return todo.id !== id;
      });
      setItems(updatedItem);
   };

   //    code for delete all items

   const removeAll = () => {
      setItems([]);
   };

   //    code for add item by Enter keypress

   const handleKeypress = (e) => {
      console.log(e.key);
      if (e.key === "Enter") {
         addItem();
      }
   };

   //    code for adding data to localStorage

   useEffect(() => {
      localStorage.setItem("mytodolist", JSON.stringify(items));
   }, [items]);

   return (
      <>
         <div className="main-div">
            <div className="child-div">
               <figure>
                  <img
                     src="https://img.icons8.com/nolan/64/todo-list.png"
                     alt="todo-pic"
                  />
                  <figcaption>Add your Todo list here</figcaption>
               </figure>
               <div className="addItems">
                  <input
                     type="text"
                     placeholder="Add item "
                     className="form-control"
                     value={inputData}
                     onChange={handleChange}
                     onKeyPress={(e) => handleKeypress(e)}
                  />
                  {toggleButton ? (
                     <i className="far fa-edit add-btn" onClick={addItem}></i>
                  ) : (
                     <i className="fa fa-plus add-btn" onClick={addItem}></i>
                  )}
                  {/* <i className="fa fa-plus add-btn" onClick={addItem}></i> */}
               </div>
               {/* all todos item */}
               <div className="showItems">
                  {items.map((todo) => {
                     return (
                        <div className="eachItem" key={todo.id}>
                           <h3>{todo.name}</h3>
                           <div className="todo-btn">
                              <i
                                 className="far fa-edit "
                                 onClick={() => handleEdit(todo.id)}
                              ></i>
                              <i
                                 className="far fa-trash-alt "
                                 onClick={() => handleDelete(todo.id)}
                              ></i>
                           </div>
                        </div>
                     );
                  })}
               </div>

               {/* remove all button */}
               <div className="showItems">
                  <button
                     className="btn effect04"
                     data-sm-link-text="Remove All"
                     onClick={removeAll}
                  >
                     <span>Check List</span>
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};

export { Todo };
