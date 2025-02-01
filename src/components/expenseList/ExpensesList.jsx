import React,{useState, useContext} from "react";
import ExpenseContext from "../store/expense-context";





const ExpensesList = ({ expenses,  onDelete }) => {
  
  const ctx= useContext(ExpenseContext)
  
  console.log("expenses",expenses)
 
  
  return (
    <tbody>
      {expenses.map((expense) => (
        <tr key={expense.id} className="hover:bg-gray-100">
          <td className="border border-gray-300 px-4 py-2">{expense.enteredCategory}</td>
          <td className="border border-gray-300 px-4 py-2">{expense.enteredDescription}</td>
          <td className="border border-gray-300 px-4 py-2">{expense.enteredMoney}</td>
          <td className="border border-gray-300 px-4 py-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
              onClick={() => ctx.editable(expense)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={()=>onDelete(expense.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ExpensesList;
