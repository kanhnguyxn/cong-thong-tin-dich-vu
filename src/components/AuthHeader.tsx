"use client";

import { useEffect, useState } from "react";
import Header from "./Header";

export default function AuthHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check for authentication token in localStorage
    const authToken = localStorage.getItem('authToken');
    setIsLoggedIn(!!authToken);
  }, []);

  return <Header isLoggedIn={isLoggedIn} />;
}
