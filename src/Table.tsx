interface TableProps {
  expenses: Expense[];
}

export interface Expense {
  id: number;
  merchant: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  status: string;
}

export function Table({ expenses }: TableProps): JSX.Element {
  if (expenses.length === 0) {
    return <p>No expenses available.</p>;
  }

  const titlesFromData = Object.keys(expenses[0]);
  const reorderedTitles = [
    titlesFromData[4],
    titlesFromData[1],
    titlesFromData[2],
    titlesFromData[5],
    titlesFromData[3],
    titlesFromData[6],
  ];

  function capitalizeFirstLetter(sentence: string): string {
    return sentence
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function makeDateReadable(unreadableDate: string): string {
    const date = new Date(unreadableDate);

    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <>
      <h1>Expenses</h1>
      <table>
        <thead>
          <tr className="header">
            {reorderedTitles.map((title, index) => (
              <th key={index}>{capitalizeFirstLetter(title)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{makeDateReadable(expense.date)}</td>
              <td>{expense.merchant}</td>
              <td>{"£" + expense.amount.toFixed(2)}</td>
              <td>{capitalizeFirstLetter(expense.category)}</td>
              <td>{expense.description}</td>
              <td>{capitalizeFirstLetter(expense.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
