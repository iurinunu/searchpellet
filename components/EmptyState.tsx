import React from 'react';
import { Heading, Flex, Text, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import AddSiteModal from './AddSiteModal';

const EmptyState = () => (
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius="8px"
      p={16}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading size="lg" mb={2}>
        Non hai ancora aggiunto alcun annuncio
      </Heading>
      <Text mb={4}>Iniziamo!</Text>
      {/* <AddSiteModal>
        Aggiungi il tuo primo annuncio
      </AddSiteModal> */}
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
);

export default EmptyState;