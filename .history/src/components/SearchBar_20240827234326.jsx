import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fetchItemData = async (nr) => {
  const response = await fetch(`http://localhost:5000/post/${nr}`);
  const data = await response.json();
  return replaceRedirectUrls(data);
};

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setSearchValue(value);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-400">
        <Label htmlFor="id-search" className="text-sm font-medium text-gray-200 mr-2">
          ID
        </Label>
        <div className="relative">
          <Input
            type="text"
            id="id-search"
            placeholder="Enter ID"
            value={searchValue}
            onChange={handleInputChange}
            onSumit={() => fetchItemData(searchValue)}
            className="w-40 bg-gray-700 text-white placeholder-gray-400 border-none rounded-full pr-10 focus:ring-0 focus:outline-none transition-all duration-300 focus:w-48"
          />
        </div>
      </div>
    </div>
  );
}
