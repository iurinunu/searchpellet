import React, { useEffect, useState } from 'react';

import HomePageLayout from '@/components/HomePageLayout';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Link, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import LogoIcon from '@/components/LogoIcon';
import { useAuth } from '@/lib/auth';
import { useForm } from 'react-hook-form';
import { useLoadScript } from '@react-google-maps/api';
import PlacesAutocomplete from '@/components/PlacesAucomplete';
import { placeCoordinates } from 'types/place-search';
import { Seller } from 'types/seller';


const SellerRegister = ({ children }: any) => {
    // const {
    //   handleSubmit,
    //   register,
    //   formState: { errors, isSubmitting },
    // } = useForm()
  
    // function onSubmit(values: any): Promise<void> {
    //     console.log('values');
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       // alert(JSON.stringify(values, null, 2))
    //       console.log(values);
    //       resolve()
    //     }, 3000)
    //   })
    // }

    const auth: any = useAuth();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY!,
        libraries: ["drawing" ,"geometry" , "localContext" , "places" ,"visualization"],
      });


    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
        auth.createUserWithEmailAndPassword(data);
        
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
        <HomePageLayout>
            <Flex justify='center'>
                <Box className='w-2/4'>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                
                <FormControl className='pb-4' isInvalid={errors.tel}>

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
                        {errors.tel && errors.tel.message}
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
                <Button mt={4} colorScheme='teal' type='submit'>
                    Submit
                </Button>
            </form>
                </Box>
            </Flex>
            
        </HomePageLayout>

    )
  }
export default SellerRegister;