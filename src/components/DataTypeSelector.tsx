import React from 'react';
import { Check } from 'lucide-react';

interface DataTypeSelectorProps {
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

const dataTypes = [
  'Full Name',
  'Email',
  'Phone Number',
  'Date of Birth',
  'Address',
  'Company',
  'Job Title',
  'Credit Card Number',
  'UUID',
  'IP Address',
];

const DataTypeSelector: React.FC<DataTypeSelectorProps> = ({ selectedTypes, setSelectedTypes }) => {
  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Select Data Types:</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dataTypes.map((type) => (
          <button
            key={type}
            onClick={() => toggleType(type)}
            className={`p-2 rounded-md flex items-center justify-between ${
              selectedTypes.includes(type)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {type}
            {selectedTypes.includes(type) && <Check size={16} />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataTypeSelector;