import React, { useState } from "react";
import Card from "./Card";
import ExpensesTotal from "./ExpensesTotal";
import ExpensesForm from "./ExpensesForm";
import ExpensesList from "./ExpensesList";

const Expenses = () => {
  const [items, setItems] = useState([]);

  // Handler to add new expense
  const itemsHandler = (data) => {
    setItems((prevItems) => [...prevItems, data]);
  };

  // Handler to edit an expense
  const editItemHandler = (index) => {
    const itemToEdit = items[index];
    console.log("Edit item:", itemToEdit);
    // Further implementation for editing logic
  };

  // Handler to delete an expense
  const deleteItemHandler = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Card>
        <ExpensesTotal items={items} />
      </Card>
      <Card>
        <ExpensesForm onClick={itemsHandler} />
      </Card>
      <Card>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <ExpensesList
            expenses={items}
            onEdit={editItemHandler}
            onDelete={deleteItemHandler}
          />
        </table>
      </Card>
    </div>
  );
};

export default Expenses;
