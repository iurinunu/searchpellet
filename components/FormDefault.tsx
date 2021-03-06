import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import useSWR from 'swr';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useDisclosure,
	useToast
} from '@chakra-ui/react';

import { useMergeRefs } from "@chakra-ui/hooks";

import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import { InputField } from './Input';


const FormDefault = ({children}: any) => {
  const initialRef = useRef();
	const toast = useToast();
	const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const { handleSubmit, register } = useForm();

  const onCreateSite = ({ name, url }: any) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url
    };

    const { id } = createSite(newSite);
    toast({
      title: 'Success!',
      description: "We've added your site.",
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    mutate(
      ['/api/sites', auth.user.token],
      async (data: any) => ({
        sites: [{ id, ...newSite }, ...data.sites]
            }),
      false
    );
    onClose();
  };

  return (
    <>

      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        { children }
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <InputField name="title" placeholder="title" label="Title" />
              <Input
                {...register("name", {
                  required: 'Required'
                })}
								ref={useMergeRefs(initialRef, register("name").ref)}
								placeholder="My site"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                {...register("url",{
                  required: 'Required'
                })}
								placeholder="https://website.com"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormDefault;