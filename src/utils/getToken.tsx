// lay accsess va refresh token tu cookie

export default function getToken() {
  // chua co document
  if (typeof document === "undefined") {
    return {
      access: null,
      refresh: null,
    };
  }
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return {
    access: cookies["access"] || null,
    refresh: cookies["refresh"] || null,
  };
}
