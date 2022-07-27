import useSWR from 'swr';
import { mutate } from 'swr';

import { useAuth } from '@/lib/auth';
import DashboardShell from '@/components/DashboardShell';
import ContainerPhotoUploader from '@/components/PhotoUpload/ContainerPhotoUploader';


import SiteTableHeader from '@/components/SiteTableHeader';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Icon, Input, Stack, Switch, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { createAd, editAd } from '@/lib/db';
import Router from 'next/router';
import FileUpload from '@/components/FileUpload';

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import firebase, { storage } from './../lib/firebase';

import { FiFile } from 'react-icons/fi'
import { resolve } from 'path';

const SellerAddAd = ({ children }: any) => {

    const auth: any = useAuth();

  console.log('seller add')


  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  setValue('active', true);
  const [isAddSend, setIsAddSend] = useState(false);

  const toast = useToast();

  const onSubmitRegister = async (data: any) => {
    console.log(data);
    // return;
    //return;
    const newAd = {
        active: data.active,
        sellerId: auth.user.uid,
        createdAt: new Date().toISOString(),
        title: data.title
      };

      console.log(data);
      console.log(newAd);

      setIsAddSend(true);

      createAd(newAd)
      .then(async (_) => {
        if (!data.file_?.length || data.file_?.length === 0) {
            return finalStep([], _, newAd);
        } else {
            return uploadFiles(data.file_.filter((_: any) => !!_), _, newAd);
        }
      })
      .catch((err) => {
            console.log(err)
            setIsAddSend(false);
      });
  }

  const finalStep = (photoURLs: any, doc: any, newAd: any) => {
    console.log(photoURLs);
    console.log(doc);

    setIsAddSend(false);
    toast({
        title: 'Success!',
        description: "We've created your ad.",
        status: 'success',
        duration: 5000,
        isClosable: true
        });
    mutate(
        ['/api/ads', auth.user.token],
        async (data: any) => ({
            sites: [{ id: doc.id, photoURLs: photoURLs, ...newAd }, ...data?.ads || []]
                }),
        false
    );
    Router.push('/seller-dashboard');
    
  }

  const uploadFiles = (files: any, doc: any, newAd: any): void => {
    const promises = [];
    let photosURLs: string[] = [];
    
    // let defaultStorage = firebase.storage();

    files.forEach((file: any) => {
        if (!file) return;
        console.log('loop');

        const sotrageRef = ref(storage, `files/${file.name}`);

        const uploadTask = uploadBytesResumable(sotrageRef, file);
        promises.push(uploadTask)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                console.log('snapshot');
                console.log(snapshot);
                // const prog = Math.round(
                //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                // );
                // setProgress(prog);
            },
            (error) => console.log(error),
            async () => {
                console.log('async');
                await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // setURLs(prevState => [...prevState, downloadURLs])
                    console.log("File available at", downloadURL);

                    photosURLs.push(downloadURL);

                    console.log(photosURLs.length);
                    console.log(files.length);
                    if (photosURLs.length === files.length) {
                        // return new Promise<boolean>((resolve, reject) => resolve(true));
                        return editAd({photosURLs: photosURLs}, doc.id)
                            .then((_) => finalStep(photosURLs, doc, newAd))
                    }

                });

                // return getDownloadURL(uploadTask.snapshot.ref);
            }
        );


    })


  };



  const handleChangePhotos = (e: any) => {
    console.log(e);
    // let files = e.map((_) => _.url);
    setValue("file_", e);
  }


  return (
    <DashboardShell>
      <Stack mb={8} spacing={4} direction='row' align='center'>
            <Button variant='outline' leftIcon={<ArrowBackIcon />} colorScheme='teal'>
                Back
            </Button>
            <Heading mb={8}>Crea annuncio</Heading>
        </Stack>
      <>
                    {/* <Heading>
                    Register
                    </Heading> */}
                    <Flex justify='start'>
                    <Box className='w-2/4'>
                    <form key={1} onSubmit={handleSubmit(onSubmitRegister)}>
                    <FormControl  className='pb-4' isInvalid={errors.title}>
                        {/* Input stuff */}
                        <FormLabel htmlFor='title'>Titolo Annuncio</FormLabel>
                        <Input
                            id='title'
                            type='text'
                            placeholder='Nome Azienda/Venditore'
                            {...register('title', {
                            required: 'Campo obbligatorio',
                            minLength: { value: 4, message: 'Lunghezza minima 3 caratteri' },
                            maxLength: { value: 80, message: 'Lunghezza massima 80 caratteri' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.title && errors.title.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.file_}>
                        <FormLabel htmlFor='file_'>File input</FormLabel>

                            <ContainerPhotoUploader setPhotos={handleChangePhotos}/>


                        <FormErrorMessage>
                            {errors.file_ && errors?.file_.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl display='flex' alignItems='center'>
                        <FormLabel htmlFor='email-alerts' mb='0'>
                            Annuncio attivo
                        </FormLabel>
                        <Switch onChange={(e) => setValue('active', e.target.checked)} defaultChecked size='lg' id='email-alerts' />
                    </FormControl>

                  
                    <Button isLoading={isAddSend} //errorsLogin.password?.message || errorsLogin.email?.message}
                            loadingText='Submitting' mt={4} colorScheme='teal' type='submit'>
                        Crea Annuncio
                    </Button>
                </form>
                    </Box>
                </Flex>
                </>
    </DashboardShell>
  );
};

export default SellerAddAd;