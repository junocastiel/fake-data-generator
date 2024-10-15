import React, { useState } from 'react';
import { Database, Download } from 'lucide-react';
import DataTypeSelector from './components/DataTypeSelector';
import GeneratedData from './components/GeneratedData';
import { generateFakeData } from './utils/dataGenerator';

function App() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [rowCount, setRowCount] = useState<number>(10);
  const [generatedData, setGeneratedData] = useState<any[]>([]);
  const [domains, setDomains] = useState<string>('');
  const [isMultilingual, setIsMultilingual] = useState<boolean>(false);

  const handleGenerate = () => {
    const domainList = domains.split(',').map(domain => domain.trim()).filter(Boolean);
    const data = generateFakeData(selectedTypes, rowCount, domainList, isMultilingual);
    setGeneratedData(data);
  };

  const handleDownload = () => {
    const csvContent = generatedData.map(row => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'generated_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Fake Data Generator</h1>
        <div className="mb-6">
          <DataTypeSelector selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
        </div>
        <div className="mb-6">
          <label htmlFor="rowCount" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Rows:
          </label>
          <input
            type="number"
            id="rowCount"
            value={rowCount}
            onChange={(e) => setRowCount(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            min="1"
            max="1000"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="domains" className="block text-sm font-medium text-gray-700 mb-2">
            Email Domains (comma-separated):
          </label>
          <input
            type="text"
            id="domains"
            value={domains}
            onChange={(e) => setDomains(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="example.com, test.org"
          />
        </div>
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isMultilingual}
              onChange={(e) => setIsMultilingual(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Multilingual and Emoji</span>
          </label>
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={handleGenerate}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
          >
            <Database className="mr-2" size={20} />
            Generate Data
          </button>
          {generatedData.length > 0 && (
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center"
            >
              <Download className="mr-2" size={20} />
              Download CSV
            </button>
          )}
        </div>
        {generatedData.length > 0 && <GeneratedData data={generatedData} />}
      </div>
    </div>
  );
}

export default App;