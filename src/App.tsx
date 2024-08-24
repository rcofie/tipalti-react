import { useEffect, useState } from "react";
import { Table, Expense } from "./Table";

function App(): JSX.Element {
  const [data, setData] = useState<Expense[]>([]);

  useEffect(() => {
    async function callAPI(): Promise<void> {
      try {
        const response = await fetch(
          "https://expenses-backend-mu.vercel.app/expenses",
          {
            headers: {
              "Content-Type": "application/json",
              Username: "Rebecca Cofie",
            },
          }
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to receive response:", error);
        alert("Failed to load table data");
      }
    }
    callAPI();
  }, []);

  return (
    <div id="template-text">
      <Table expenses={data} />
    </div>
  );
}

export default App;
