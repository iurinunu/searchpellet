import React from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button,
  Flex,
  Link,
  Avatar,
  Icon
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';
import LogoIcon from './LogoIcon';
import AddSiteModal from './AddSiteModal';



const HomePageLayout = ({ children }: any) => {

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex
        backgroundColor="white"
        mb={16}
        w="full"
        borderTop="5px solid #0AF5F4"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
        >
          <Flex align="center">
            <NextLink href="/homePage" passHref>
              <Link className="shadow-none !no-underline">
                <Flex alignItems='center'>
                    <LogoIcon color={"black"} boxSize={12} marginRight={2} />
                    <strong>CercaPellet</strong>
                </Flex>
              </Link>
            </NextLink>
        
          </Flex>
          <Flex justifyContent="center" alignItems="center">
             <NextLink href="/homePage" passHref>
                <Button className="shadow-none" as="a" variant="solid" mr={2}>
                  Sei un Venditore?
                </Button>
              </NextLink>
            {/* <Avatar size="sm" src={''} /> */}
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
        {children}
      </Flex>
    </Box>
  );
};

export default HomePageLayout;