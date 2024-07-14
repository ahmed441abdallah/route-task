import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const CustomerList = ({
  setMaxAmount,
  setMinAmount,
  minAmount,
  maxAmount,
  customers,
  getCustomerTransactions,
}) => {
  return (
    <div>
      <div className="mt-2">
        <label>
          Min Amount:
          <input
            type="number"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
          />
        </label>
        <label>
          Max Amount:
          <input
            type="number"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
          />
        </label>
      </div>
      <Table>
        <TableCaption>A list of customers and transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Customer_Id</TableHead>
            <TableHead>Customer_Name</TableHead>
            <TableHead>Transaction_Date</TableHead>
            <TableHead className="text-right">Transaction_Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((el) =>
            getCustomerTransactions(el.id).map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{el.id}</TableCell>
                <TableCell>{el.name}</TableCell>
                <TableCell className="text-right">{transaction.date}</TableCell>
                <TableCell className="text-right">
                  {transaction.amount}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerList;
