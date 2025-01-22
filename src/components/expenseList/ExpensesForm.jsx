import React, { useRef } from "react";

const ExpensesForm = (props) => {
  const moneyRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

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
        const errorData = await res.json();
        throw new Error(`Error: ${errorData.error || "Unknown error occurred"}`);
      }
  
      const responseData = await res.json();
      console.log("Data posted successfully:", responseData);
  
      
      moneyRef.current.value = "";
      descriptionRef.current.value = "";
      categoryRef.current.value = "";
  
      
      props.onClick(data);
  
    } catch (err) {
      console.error("Something went wrong:", err.message);
    }
  };
  
  return (
    <div>
      <form>
        <h1>Add Expenses</h1>

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

        <button onClick={buttonHandler}>Add</button>
      </form>
    </div>
  );
};

export default ExpensesForm;
