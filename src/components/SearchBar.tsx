"use client";

import { useEffect, useState } from "react";

// tạo thanh tìm kiếm
interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  debounceTime?: number;
}

export const SearchBar = ({
  onSearch,
  placeholder = "Tìm kiếm...",
  debounceTime = 1000,
  className = "",
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Implement debounced search
  useEffect(() => {
    // Only proceed if onSearch is provided
    if (!onSearch) return;

    // Set timeout to delay search execution
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, debounceTime);

    // Cleanup function to clear timeout
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className={` flex gap-3 items-center pr-6 ${className}`}>
      <div className="relative ">
        <input
          type="search"
          name="searchQuery"
          placeholder={placeholder}
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="pl-3 py-1 pr-10 rounded-md border-2 border-[var(--color-blue)]"
          style={{width:"34vw"}}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <img src="/assets/icons/search.svg" alt="Search icon" />
        </div>
      </div>
    </div>
  );
};
