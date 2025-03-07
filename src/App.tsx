import { Button, Snackbar } from '@mui/material';
import './App.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SCHEMA } from './components/schema';
import { z } from 'zod';
import FormInput from './components/formInput'

const schema = SCHEMA;
export type Inputs = z.infer<typeof schema>;

function App() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.address.toLowerCase().includes('sofia') && data.postcode !== '1000') {
      setError('postcode', {
        type: 'manual',
        message: "Your postal code and city don't match",
      });
      return;
    }

    clearErrors();

    const payload = {
      type: 'INDIVIDUAL',
      ...data,
    };

    console.log(payload);

    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setSuccessMessage('Form submitted successfully!');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const formFields = [
    { id: 'firstName', label: 'First Name *' },
    { id: 'middleName', label: 'Middle Name' },
    { id: 'lastName', label: 'Last Name *' },
    { id: 'egn', label: 'EGN' },
    { id: 'address', label: 'Address *' },
    { id: 'postcode', label: 'Postcode *' },
    { id: 'phoneNumber', label: 'Phone Number *' },
    { id: 'email', label: 'Email Address *' },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Please enter your details:</h1>
        {formFields.map(({ id, label }) => (
          <FormInput
            key={id}
            id={id as keyof Inputs}
            label={label}
            register={register}
            trigger={trigger}
            error={!!errors[id as keyof Inputs]}
            helperText={errors[id as keyof Inputs]?.message || ''}
          />
        ))}

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>

      {successMessage && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage(null)}
          message={successMessage}
        />
      )}
    </div>
  );
}

export default App;
