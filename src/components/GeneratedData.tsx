import React from 'react';

interface GeneratedDataProps {
  data: any[];
}

const GeneratedData: React.FC<GeneratedDataProps> = ({ data }) => {
  if (data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header) => (
              <th key={header} className="py-2 px-4 border-b text-left">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              {headers.map((header) => (
                <td key={`${index}-${header}`} className="py-2 px-4 border-b">{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeneratedData;