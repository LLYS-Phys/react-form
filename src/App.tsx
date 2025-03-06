import { Button, TextField } from '@mui/material'
import './App.css'
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  firstName: string
  middleName: string
  lastName: string
  egn: number
  address: string
  postcode: number
  phoneNumber: string
  email: string
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Watch real-time values
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  // Watch phoneNumber and email fields in real-time
  const phoneNumberValue = watch("phoneNumber")
  const emailValue = watch("email")

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Please enter your details:</h1>
      <TextField 
        id="firstName" 
        label="First Name (Собствено име) *" 
        variant="outlined" 
        {...register("firstName", { required: true })} 
        autoComplete='off'
        error={!!errors.firstName}
        helperText={errors.firstName ? "This field is required" : ""}
      />

      <TextField 
        id="middleName" 
        label="Middle Name (Презиме)" 
        variant="outlined" 
        {...register("middleName")} 
        autoComplete='off'
      />

      <TextField 
        id="lastName" 
        label="Last Name (Фамилия) *" 
        variant="outlined" 
        {...register("lastName", { required: true })} 
        autoComplete='off'
        error={!!errors.lastName}
        helperText={errors.lastName ? "This field is required" : ""}
      />

      <TextField 
        id="egn" 
        label="EGN (ЕГН)" 
        variant="outlined" 
        {...register("egn")} 
        autoComplete='off'
      />

      <TextField 
        id="address" 
        label="Address (Адрес) *" 
        variant="outlined" 
        {...register("address", { required: true })} 
        autoComplete='off'
        error={!!errors.address}
        helperText={errors.address ? "This field is required" : ""}
      />

      <TextField 
        id="postcode" 
        label="Postcode (Пощенски код) *" 
        variant="outlined" 
        {...register("postcode", { required: true })} 
        autoComplete='off'
        error={!!errors.postcode}
        helperText={errors.postcode ? "This field is required" : ""}
      />

      <TextField 
        id="phoneNumber" 
        label="Phone Number (Телефонен номер) *" 
        variant="outlined" 
        autoComplete='off'
        {...register("phoneNumber", { 
          required: (emailValue && emailValue.length == 0) || !emailValue
        })} 
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber ? "Either phone number or email is required" : ""}
      />

      <TextField 
        id="email" 
        label="Email Address (Имейл адрес) *" 
        variant="outlined" 
        autoComplete='off'
        {...register("email", { 
          required: (phoneNumberValue && phoneNumberValue.length == 0) || !phoneNumberValue
        })} 
        error={!!errors.email}
        helperText={errors.email ? "Either phone number or email is required" : ""}
      />

      <Button variant="contained" type="submit">Submit</Button>
    </form>
  )
}

export default App
