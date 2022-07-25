import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Button
} from '@chakra-ui/react';
import NextLink from 'next/link';


import AddSiteModal from './AddSiteModal';

const SiteTableHeader = () => (
  <>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Annunci</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>I tuoi Annunci</Heading>
      <NextLink href="/seller-add-ad" passHref>
        
        <Button
        as='a'
      href='/seller-add-ad'
      backgroundColor="gray.900"
      color="white"
      fontWeight="medium"
      _hover={{ bg: 'gray.700' }}
      _active={{
        bg: 'gray.800',
        transform: 'scale(0.95)'
      }}
      >+ Crea Annuncio
      </Button>
      </NextLink>
      
    </Flex>
  </>
);

export default SiteTableHeader;