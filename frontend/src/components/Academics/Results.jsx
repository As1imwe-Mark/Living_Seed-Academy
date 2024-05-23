import { useState, useEffect } from 'react';
import client from '../../client';

const ResultsTable = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    // Fetch data from Sanity.io
    const fetchData = async () => {
      try {
        const query = '*[_type == "ResultsTable"]'; // Correct data type
        const data = await client.fetch(query);
        setRowData(data);
      } catch (error) {
        console.error('Error fetching data from Sanity.io:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4 p-text">Primary Leaving Examinations Results <span>{rowData.Year}</span></h1>
      <p className="text-lg mb-6 text-center p-text">
        We are thrilled to share the outstanding achievements of our pupils in the Primary Leaving Examinations. Their hard work, dedication, and the unwavering support from our dedicated teachers and parents have culminated in remarkable results that reflect our commitment to academic excellence. Below is a detailed breakdown of our pupils' performance, showcasing their success across various divisions.
      </p>
      <div className="overflow-x-auto w-full shadow-lg">
        <table className="table-auto min-w-full border-collapse border border-gray-300 p-text">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Division 1</th>
              <th className="border px-4 py-2">Division 2</th>
              <th className="border px-4 py-2">Division 3</th>
              <th className="border px-4 py-2">Division 4</th>
              <th className="border px-4 py-2">Ungraded</th>
              <th className="border px-4 py-2">Total Candidates</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2 text-center p-text text-lg">{row.division1}</td>
                <td className="border px-4 py-2 text-center p-text text-lg">{row.division2}</td>
                <td className="border px-4 py-2 text-center p-text text-lg">{row.division3}</td>
                <td className="border px-4 py-2 text-center p-text text-lg">{row.division4}</td>
                <td className="border px-4 py-2 text-center p-text text-lg">{row.ungraded}</td>
                <td className="border px-4 py-2 text-center text-red-700 text-xl font-bold">{row.Total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
