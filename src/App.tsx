import { Button, TextField } from '@mui/material'
import './App.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
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
    .or(z.literal("")),

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

type Inputs = z.infer<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Please enter your details:</h1>

      <TextField 
        id="firstName" 
        label="First Name *" 
        variant="outlined" 
        {...register("firstName")} 
        autoComplete='off'
        error={!!errors.firstName}
        helperText={errors.firstName?.message || ""}
      />

      <TextField 
        id="middleName" 
        label="Middle Name" 
        variant="outlined" 
        {...register("middleName")} 
        autoComplete='off'
        error={!!errors.middleName}
        helperText={errors.middleName?.message || ""}
      />

      <TextField 
        id="lastName" 
        label="Last Name *" 
        variant="outlined" 
        {...register("lastName")} 
        autoComplete='off'
        error={!!errors.lastName}
        helperText={errors.lastName?.message || ""}
      />

      <TextField 
        id="egn" 
        label="EGN" 
        variant="outlined" 
        {...register("egn")} 
        autoComplete='off'
        error={!!errors.egn}
        helperText={errors.egn?.message || ""}
      />

      <TextField 
        id="address" 
        label="Address *" 
        variant="outlined" 
        {...register("address")} 
        autoComplete='off'
        error={!!errors.address}
        helperText={errors.address?.message || ""}
      />

      <TextField 
        id="postcode" 
        label="Postcode *" 
        variant="outlined" 
        {...register("postcode")} 
        autoComplete='off'
        error={!!errors.postcode}
        helperText={errors.postcode?.message || ""}
      />

      <TextField 
        id="phoneNumber" 
        label="Phone Number *" 
        variant="outlined" 
        autoComplete='off'
        {...register("phoneNumber")} 
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber?.message || ""}
      />

      <TextField 
        id="email" 
        label="Email Address *" 
        variant="outlined" 
        autoComplete='off'
        {...register("email")} 
        error={!!errors.email}
        helperText={errors.email?.message || ""}
      />

      <Button variant="contained" type="submit">Submit</Button>
    </form>
  )
}

export default App;
