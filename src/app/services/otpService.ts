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
  return inputOtp === expectedOtp;
};
