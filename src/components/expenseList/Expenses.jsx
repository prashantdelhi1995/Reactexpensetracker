import React, { useStat, useEffect, useState ,useContext } from "react";
import Card from "./Card";
import ExpenseContext from "../store/expense-context";
import ExpensesTotal from "./ExpensesTotal";
import ExpensesForm from "./ExpensesForm";
import ExpensesList from "./ExpensesList";
import { itemsAction } from "../reduxStore/fetchData";
import { useDispatch, useSelector } from "react-redux";

const Expenses = () => {
  const ctx=useContext(ExpenseContext)
  const {forReload:autoReload}= ctx
  const dispatch= useDispatch();
  const items= useSelector((state) => state.fetchData.itemList);
  console.log("items=",items)
  
  const [total, setTotal] = useState(0);
  const userId=localStorage.getItem("userID")
  // const autoReload= async ()=>{
  //   try{
  //   const res=await fetch("https://expense-tracker-6095c-default-rtdb.firebaseio.com/expense/"+userId+".json")
  //   if(!res.ok){
  //     const err= await res.json()
  //     throw new Error("something went wrong"+err.error)

  //   }
  //   const data=await res.json()
  //   console.log("data=",data)
  //   let arr = [];
  //     let index = 0;
  //     for (const key in data) {
  //       arr[index] = {...data[key],id:key};
  //       index++;
  //     }
  //     setItems([...arr]);
  //   }
  //   catch(err){
  //     console.log(err)
  //   }


  // }
 
  let totalAmount = 0;
  const totalCal = () => {
    items.map((element) => {
      totalAmount = totalAmount + Number(element.enteredMoney);
    });
    setTotal(totalAmount);
  };

  useEffect(() => {
    totalCal();
  }, [items]);


  // Handler to add new expense
  const itemsHandler = (data) => {
    autoReload()
  };



  // Handler to delete an expense
  const deleteItemHandler = async (id) => {
    try {
      const res = await fetch(
        `https://expense-tracker-6095c-default-rtdb.firebaseio.com/expense/${userId}/${id}.json`,
        {
          method: "DELETE",
        }
      );
  
      if (!res.ok) {
        throw new Error("Failed to delete expense");
      }
  
      alert("Expense deleted successfully");
      autoReload()
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Card>
        <ExpensesTotal totalAmount={total} />
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
           
            onDelete={deleteItemHandler}
           
          />
        </table>
      </Card>
    </div>
  );
};

export default Expenses;
