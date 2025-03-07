import { z } from "zod"

export const SCHEMA = z.object({
    firstName: z.string()
      .min(2, "Must be at least 2 characters")
      .max(64, "Must be at most 64 characters")
      .regex(/^[A-Za-z' -]+$/, "Only letters, apostrophes, hyphens, and spaces allowed"),
    
    middleName: z.string()
      .min(2, "Must be at least 2 characters")
      .max(64, "Must be at most 64 characters")
      .regex(/^[A-Za-z' -]+$/, "Only letters, apostrophes, hyphens, and spaces allowed")
      .optional()
      .or(z.literal("")),
  
    lastName: z.string()
      .min(2, "Must be at least 2 characters")
      .max(64, "Must be at most 64 characters")
      .regex(/^[A-Za-z' -]+$/, "Only letters, apostrophes, hyphens, and spaces allowed"),
    
    egn: z.string()
      .regex(/^\d{10}$/, "EGN must be exactly 10 digits")
      .optional()
      .or(z.literal(""))
      .refine((egn) => egn === "" || isValidBulgarianEGN(egn!), {
        message: "Invalid Bulgarian EGN format",
      }),
  
    address: z.string()
      .min(2, "Address must be at least 2 characters")
      .max(255, "Address cannot exceed 255 characters"),
  
    postcode: z.string()
      .length(4, "Postcode must be exactly 4 digits")
      .regex(/^\d{4}$/, "Postcode must contain only digits"),
  
    phoneNumber: z.string()
      .regex(/^(\+|00)[0-9]{9,16}$/, "Invalid phone number")
      .optional()
      .or(z.literal("")),
  
    email: z.string()
      .email("Invalid email format")
      .optional()
      .or(z.literal("")),
  }).refine((data) => data.phoneNumber || data.email, {
    message: "Either phone number or email is required",
    path: ["phoneNumber"],
});

const isValidBulgarianEGN = (egn: string): boolean => {
    if (!/^\d{10}$/.test(egn)) return false;
  
    const year = parseInt(egn.substring(0, 2), 10);
    const month = parseInt(egn.substring(2, 4), 10);
    const day = parseInt(egn.substring(4, 6), 10);
    const birthMonth = month > 40 ? month - 40 : month > 20 ? month - 20 : month;
  
    const fullYear = month > 40 ? 1800 + year : month > 20 ? 2000 + year : 1900 + year;
    const date = new Date(fullYear, birthMonth - 1, day);
    if (date.getFullYear() !== fullYear || date.getMonth() + 1 !== birthMonth || date.getDate() !== day) {
      return false;
    }
  
    const weights = [2, 4, 8, 5, 10, 9, 7, 3, 6];
    let checksum = 0;
    for (let i = 0; i < 9; i++) {
      checksum += parseInt(egn[i], 10) * weights[i];
    }
    const validChecksum = checksum % 11 % 10;
  
    return validChecksum === parseInt(egn[9], 10);
};