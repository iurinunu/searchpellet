import React, { useEffect, useState } from 'react';

import HomePageLayout from '@/components/HomePageLayout';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Stack, Text } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { useForm } from 'react-hook-form';
import { useLoadScript } from '@react-google-maps/api';
import PlacesAutocomplete from '@/components/PlacesAucomplete';
import { ArrowBackIcon } from '@chakra-ui/icons';


const SellerRegister = ({ children }: any) => {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const [isLoginSend, setIsLoginSend] = useState(false);
    const [isRegisterSend, setIsRegisterSend] = useState(false);



    const auth: any = useAuth();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY!,
        libraries: ["drawing" ,"geometry" , "localContext" , "places" ,"visualization"],
      });


    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const onSubmitRegister = async (data: any) => {
        console.log(data);
        setIsRegisterSend(true);
        await auth.createUserWithEmailAndPassword(data).catch((err: any) => {
            console.log('catch');
            setIsRegisterSend(false);
        })
        
    }

    const { register: registerLogin, handleSubmit: handleSubmitLogin, setValue: setValueLogin, formState: { errors: errorsLogin } } = useForm();
    const onSubmitLogin = async (data: any) => {
        console.log(data);
        setIsLoginSend(true);
        await auth.loginUserWithEmailAndPassword(data.email, data.password).catch((err: any) => {
            console.log('catch');
            setIsLoginSend(false);
        })
        
    }

    
    console.log(errors);


    const handleChange = (e: any) => {
        setValue("address", e);
    }

    useEffect(() => {
        register('address', {
            required: 'Campo obbligatorio',
        });
        
      }, [register]);


    return (
        <HomePageLayout >
            <Heading mb={8}>Ciao venditore</Heading>
            <Flex>
                { !isLoginOpen && !isRegisterOpen && <Stack spacing={4} direction='row' align='center'>
                    <Button onClick={() => setIsLoginOpen(true)} colorScheme='teal'>
                        Login
                    </Button>
                    <p>o</p>
                    <Button onClick={() => setIsRegisterOpen(true)} colorScheme='teal'>
                        Register
                    </Button>
                </Stack> }
                {
                    (isLoginOpen || isRegisterOpen) &&
                    <Stack spacing={4} direction='row' align='center'>
                        <Button variant='outline' leftIcon={<ArrowBackIcon />} onClick={() => {setIsLoginOpen(false); setIsRegisterOpen(false)}} colorScheme='teal'>
                            Back
                        </Button>
                    </Stack>
                }
                
            </Flex>
            
            {
                isRegisterOpen && 
                <>
                    {/* <Heading>
                    Register
                    </Heading> */}
                    <Flex justify='center'>
                    <Box className='w-2/4'>
                    <form key={1} onSubmit={handleSubmit(onSubmitRegister)}>
                    <FormControl  className='pb-4' isInvalid={errors.name}>
                        {/* Input stuff */}
                        <FormLabel htmlFor='name'>Nome Azienda/Venditore</FormLabel>
                        <Input
                            id='name'
                            type='text'
                            placeholder='Nome Azienda/Venditore'
                            {...register('name', {
                            required: 'Campo obbligatorio',
                            minLength: { value: 4, message: 'Lunghezza minima 3 caratteri' },
                            maxLength: { value: 80, message: 'Lunghezza massima 80 caratteri' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl className='pb-4' isInvalid={errors.email}>

                        {/* Input stuff */}
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input
                            id='email'
                            type='email'
                            placeholder='Email'
                            {...register('email', {
                            required: 'Campo obbligatorio',
                            pattern: /^\S+@\S+$/i
                            })}
                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>
                    
                    <FormControl className='pb-4' isInvalid={errors.phone}>

                        {/* Input stuff */}
                        <FormLabel htmlFor='phone'>Numero telefono</FormLabel>
                        <Input
                            id='phone'
                            type='tel'
                            placeholder='Telefono'
                            {...register('phone', {
                            required: 'Campo obbligatorio',
                            maxLength: { value: 25, message: 'Lunghezza massima 25 caratteri' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.phone && errors.phone.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl className='pb-4' isInvalid={errors.password}>

                        {/* Input stuff */}
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input
                            id='password'
                            type='password'
                            placeholder='Password'
                            {...register('password', {
                            required: 'Campo obbligatorio',
                            minLength: { value: 8, message: 'Lunghezza minima 8 caratteri' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>

                    {/* <FormControl className='pb-4' isInvalid={errors.address}>

                        <FormLabel htmlFor='address'>Indirizzo Azienda</FormLabel>
                        <Input
                            id='address'
                            placeholder='Indirizzo'
                            {...register('address', {
                            required: 'Campo obbligatorio',
                            
                            })}
                        />
                        <FormErrorMessage>
                            {errors.address && errors.address.message}
                        </FormErrorMessage>
                    </FormControl> */}
                    <FormControl className='pb-4' isInvalid={errors.address}>
                        <FormLabel htmlFor='address'>Indirizzo Azienda</FormLabel>
                        <PlacesAutocomplete setPropertyDetails={handleChange} isLoaded={isLoaded}></PlacesAutocomplete>
                        <FormErrorMessage>
                            {errors.address && errors.address.message}
                        </FormErrorMessage>
                    </FormControl>

                    <Button isLoading={isRegisterSend} //errorsLogin.password?.message || errorsLogin.email?.message}
                            loadingText='Submitting' mt={4} colorScheme='teal' type='submit'>
                        Register
                    </Button>
                </form>
                    </Box>
                </Flex>
                </>
                
        }

        {
            isLoginOpen &&
            <>
                    {/* <Heading>
                    Register
                    </Heading> */}
                    <Flex justify='center'>
                    <Box className='w-2/4'>
                    <form key={2} onSubmit={handleSubmitLogin(onSubmitLogin)}>

                    <FormControl className='pb-4' isInvalid={errorsLogin.email}>

                        {/* Input stuff */}
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input
                            id='email'
                            type='email'
                            placeholder='Email'
                            {...registerLogin('email', {
                            required: 'Campo obbligatorio',
                            pattern: /^\S+@\S+$/i
                            })}
                        />
                        <FormErrorMessage>
                            {errorsLogin.email && errorsLogin.email.message}
                        </FormErrorMessage>
                    </FormControl>
                

                    <FormControl className='pb-4' isInvalid={errorsLogin.password}>

                        {/* Input stuff */}
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input
                            id='password'
                            type='password'
                            placeholder='Password'
                            {...registerLogin('password', {
                            required: 'Campo obbligatorio',
                            minLength: { value: 8, message: 'Lunghezza minima 8 caratteri' },
                            })}
                        />
                        <FormErrorMessage>
                            {errorsLogin.password && errorsLogin.password.message}
                        </FormErrorMessage>
                    </FormControl>
                    
                    <Button isLoading={isLoginSend} //errorsLogin.password?.message || errorsLogin.email?.message}
                            loadingText='Submitting' mt={4} colorScheme='teal' type='submit'>
                        Login
                    </Button>
                </form>
                    </Box>
                </Flex>
                </>
        }
            
        </HomePageLayout>

    )
  }
export default SellerRegister;