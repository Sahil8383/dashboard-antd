import React from 'react';
import { Search, Sliders } from 'lucide-react';

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex items-center bg-[#f5f7fb] rounded-full px-4 w-[300px] h-[40px] shadow-sm">
      <Search className="text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent focus:outline-none text-gray-500 w-full"
        value={searchTerm}
        onChange={onSearchChange}
      />
      <Sliders className="text-gray-400 ml-2" />
    </div>
  );
};

export default SearchInput;
