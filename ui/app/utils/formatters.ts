export function formatPhoneNumber(phoneNumber: String) {
    // Remove non-numeric characters
    const cleaned = phoneNumber?.replace(/\D/g, '');
  
    // Check if the cleaned number has the correct length (10 digits for standard US phone number)
    if (cleaned?.length === 10) {
      // Format as (XXX) XXX-XXXX
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else {
      // Return the cleaned number if it's not a valid phone number
      return 'Invalid phone number';
    }
  }

  export function formatZip(zipCode: String) {
    // Remove any non-numeric characters (e.g., dashes, spaces)
    const cleaned = zipCode?.replace(/\D/g, '');
  
    // Check if the cleaned ZIP code has 9 digits (5 + 4)
    if (cleaned?.length === 9) {
      // Format as 12345-6789
      return cleaned.slice(0, 5) + '-' + cleaned.slice(5);
    }
  
    // If it's only 5 digits, return it as is
    if (cleaned?.length === 5) {
      return cleaned;
    }
  
    // Return the cleaned number if it's neither 5 nor 9 digits long
    return 'Invalid ZIP Code';
  }