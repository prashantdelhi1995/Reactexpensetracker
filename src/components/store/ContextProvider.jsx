import React, { useEffect, useState, useCallback } from "react";
import ExpenseContext from "./expense-context";
import { useDispatch } from "react-redux";
import { itemsAction } from "../reduxStore/fetchData";

const ContextProvider = (props) => {
  const dispatch = useDispatch();
  const [isEditOn, setEdit] = useState(false);
  const [values, setValues] = useState("");

  const setEditingState = (value) => {
    setEdit(value);
  };

  const EditHandler = (value) => {
    setValues(value);
    setEditingState(true);
  };

  const autoReloadExpenses = useCallback(async () => {
    const userId = localStorage.getItem("userID");
    console.log("useid==",userId)
    if (!userId) return; 

    try {
      const res = await fetch(
        `https://expense-tracker-6095c-default-rtdb.firebaseio.com/expense/${userId}.json`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status}`);
      }

      const data = await res.json();

      if (!data) {
        console.log("No data found.");
        dispatch(itemsAction.fetchExpenses([])); 
        return;
      }

     
      const expensesArray = Object.entries(data).map(([id, item]) => ({
        id,
        enteredCategory: item.enteredCategory,
        enteredDescription: item.enteredDescription,
        enteredMoney: item.enteredMoney,
      }));

      console.log("Fetched expenses:", expensesArray);
      dispatch(itemsAction.fetchExpenses(expensesArray));
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    autoReloadExpenses();
  }, [autoReloadExpenses]); 

  const contextData = {
    editable: EditHandler,
    editValues: values,
    isEditOn,
    editStateFunction: setEditingState,
    forReload: autoReloadExpenses,
  };

  return (
    <ExpenseContext.Provider value={contextData}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ContextProvider;
