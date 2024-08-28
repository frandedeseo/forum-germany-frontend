import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

export default function SearchBar({ fetchItemData, setSelectedItem }) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setSearchValue(value);
    }
  };

  const handleSearch = () => {
    data = fetchItemData(searchValue);
    setSelectedItem(data);
  };

  return (
    <div className="fixed top-2 right-4 z-50000">
      <div className="z-50000 flex items-center space-x-2 bg-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-400">
        <Label htmlFor="id-search" className="text-sm font-medium text-gray-200 mr-2">
          ID
        </Label>
        <div className="relative z-50000">
          <Input
            type="text"
            id="id-search"
            placeholder="Enter ID"
            value={searchValue}
            onSumbit={handleSearch}
            onChange={handleInputChange}
            className="z-50000 w-40 bg-gray-700 text-white placeholder-gray-400 border-none rounded-full pr-10 focus:ring-0 focus:outline-none transition-all duration-300 focus:w-48"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
