import { useEffect, useState } from "react";

interface BookProps {
  author: string;
  book: string;
}

function App() {
  const [formdata, setFormdata] = useState({ author: "", book: "" });
  const [value, setValue] = useState<BookProps[]>(() => {
    const savedData = localStorage.getItem("books");
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return [];
    }
  });
  const [searchTerm, setSearchTerm] = useState("");
  console.log(value);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formdata);
    setValue([...value, formdata]);
    setFormdata({ author: "", book: "" });
  };

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(value));
  }, [value]);

  const filteredData = value.filter(
    (item, i) =>
      item.author.toLowerCase().includes(searchTerm) ||
      item.book.toLowerCase().includes(searchTerm)
  );

  const handleDelete = (i: number) => {
    setValue(value.filter((item, index) => index !== i));
  };
  return (
    <>
      <h1>A Book List</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          name="author"
          value={formdata.author}
          onChange={(e) => setFormdata({ ...formdata, author: e.target.value })}
        />
        <label htmlFor="book">Book:</label>
        <input
          type="text"
          name="book"
          value={formdata.book}
          onChange={(e) => setFormdata({ ...formdata, book: e.target.value })}
        />
        <button type="submit">Add Book</button>
      </form>
      <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{ border: "1px solid black", borderCollapse: "collapse" }}
            >
              Author
            </th>
            <th
              style={{ border: "1px solid black", borderCollapse: "collapse" }}
            >
              Book
            </th>
            <th
              style={{ border: "1px solid black", borderCollapse: "collapse" }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, i) => {
            return (
              <tr key={i}>
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  {item.author}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  {item.book}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  <button onClick={() => handleDelete(i)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <input
        type="text"
        placeholder="Search by author or book"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </>
  );
}

export default App;
