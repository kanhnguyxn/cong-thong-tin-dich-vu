/**
 * Service for handling OTP functionality in the application
 * Currently provides mockup OTP generation for demonstration purposes
 */

/**
 * Generates a random 6-digit OTP code
 * @returns {string} A 6-digit OTP as a string
 */
export const generateMockupOtp = (): string => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("Generated OTP (for testing):", otp); // For testing purposes
  return otp;
};

/**
 * Validates if the input OTP matches the expected OTP
 * @param {string} inputOtp - The OTP entered by the user
 * @param {string} expectedOtp - The OTP to check against
 * @returns {boolean} Whether the OTPs match
 */
export const validateOtp = (inputOtp: string, expectedOtp: string): boolean => {
  // Convert to strings, trim whitespace, and compare
  const normalizedInput = String(inputOtp).trim();
  const normalizedExpected = String(expectedOtp).trim();
  
  console.log("Normalized input OTP:", normalizedInput);
  console.log("Normalized expected OTP:", normalizedExpected);
  
  return normalizedInput === normalizedExpected;
};
