import React from 'react'

const ExpensesTotal = (props) => {
  return (
    <div>
      <h1>Total Expenses </h1>
      <label className="text-black">₹{props.totalAmount}</label>
    </div>
  )
}

export default ExpensesTotal
