import React, { useRef, useContext, useEffect } from "react";
import ExpenseContext from "../store/expense-context";

const ExpensesForm = (props) => {
  const { isEdit, editValues, editStateFunction, editable } = useContext(ExpenseContext);
  const moneyRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  useEffect(() => {
    if (isEdit && editValues) {
      moneyRef.current.value = editValues.enteredMoney;
      descriptionRef.current.value = editValues.enteredDescription;
      categoryRef.current.value = editValues.enteredCategory;
    }
  }, [isEdit, editValues]);

  const buttonHandler = async (event) => {
    event.preventDefault();
  
    const enteredMoney = moneyRef.current.value.trim(); // Trim to avoid whitespace-only input
    const enteredDescription = descriptionRef.current.value.trim();
    const enteredCategory = categoryRef.current.value.trim();
  
    // Validate fields
    if (!enteredMoney || !enteredDescription || !enteredCategory) {
      alert("All fields are required. Please fill out the form completely.");
      return; // Stop execution if validation fails
    }
  
    const data = {
      enteredMoney,
      enteredDescription,
      enteredCategory,
    };
  
    const userId = localStorage.getItem("userID");
  

    try {
      if (isEdit) {
        // Edit case: Send a PUT request
        const res = await fetch(
          `https://expense-tracker-6095c-default-rtdb.firebaseio.com/expense/${userId}/${editValues.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to update expense");
        }
        console.log("Expense updated successfully");
      } else {
        // Add new case: Send a POST request
        const res = await fetch(
          `https://expense-tracker-6095c-default-rtdb.firebaseio.com/expense/${userId}.json`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to add expense");
        }
        console.log("Expense added successfully");
      }
     

      // Reset form and context state
      moneyRef.current.value = "";
      descriptionRef.current.value = "";
      categoryRef.current.value = "";
      editStateFunction(false); 
      
      
      props.onReload(); 
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div>
      <form>
        <h1>{isEdit?"Edit Expense":"Add Expenses"}</h1>

        <label htmlFor="money">Money Spent</label>
        <input
          type="number"
          name=""
          id="money"
          placeholder="Amount"
          ref={moneyRef}
        />

        <label htmlFor="des">Description</label>
        <input
          type="input"
          id="des"
          placeholder="Description"
          ref={descriptionRef}
        />

        <label htmlFor="category">Category</label>
        <select className="text-black" name="" id="category" ref={categoryRef}>
              <option value="" disabled>Select a category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Other">Other</option>
        </select>

        <button onClick={buttonHandler}>{isEdit?"Edit":"Add"}</button>
      </form>
    </div>
  );
};

export default ExpensesForm;
