import React from "react";

const ExpensesList = ({ expenses, onEdit, onDelete }) => {
  
  return (
    <tbody>
      {expenses.map((expense, index) => (
        <tr key={index} className="hover:bg-gray-100">
          <td className="border border-gray-300 px-4 py-2">{expense.enteredCategory}</td>
          <td className="border border-gray-300 px-4 py-2">{expense.enteredDescription}</td>
          <td className="border border-gray-300 px-4 py-2">{expense.enteredMoney}</td>
          <td className="border border-gray-300 px-4 py-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
              onClick={() => onEdit(index)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => onDelete(index)}
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
