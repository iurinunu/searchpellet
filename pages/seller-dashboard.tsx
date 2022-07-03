import React from 'react';

import HomePageLayout from '@/components/HomePageLayout';
import { Box, Button, Flex, Link, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import LogoIcon from '@/components/LogoIcon';
import { useAuth } from '@/lib/auth';

const SellerDashboard = ({ children }: any) => {

    const auth: any = useAuth();


  return (
    <HomePageLayout>
      <Box bg="gray.100" py={16}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
          <Head>
            {/* <script
              dangerouslySetInnerHTML={{
                __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/dashboard"
              }
            `
              }}
            /> */}
            <title>Area Venditori</title>
          </Head>
          
          <LogoIcon color='red.300' size='small'/>
          <LogoIcon color='black.900'/>
          <LogoIcon color='black.900' size='big'/>
          <Text mb={4} fontSize="lg" py={4}>
            <Text as="span" fontWeight="bold" display="inline">
              Area Venditori
            </Text>
            {' is being built as part of '}
            <Link
              href="https://react2025.com"
              isExternal
              textDecoration="underline"
            >
              React 2025
            </Link>
            {`. It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
          </Text>
          {auth.user ? (
            <Button
              as="a"
              href="/dashboard"
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              mt={4}
              maxW="200px"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)'
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <Stack isInline>
                <NextLink href="/seller-register" passHref>
                    <Button 
                        as="a"
                        backgroundColor="gray.900"
                        color="white"
                        fontWeight="medium"
                        
                        _hover={{ bg: 'gray.700' }}
                        _active={{
                            bg: 'gray.800',
                            transform: 'scale(0.95)'
                        }}>
                      Crea Profilo // push registra venditore page
                    </Button>
                </NextLink>

                <Button
                onClick={(e) => auth.signinWithGoogle()}
                backgroundColor="white"
                color="gray.900"
                variant="outline"
                fontWeight="medium"
                
                _hover={{ bg: 'gray.100' }}
                _active={{
                    bg: 'gray.100',
                    transform: 'scale(0.95)'
                }}
                >
                Accedi
                </Button>
          </Stack>
            // <Stack isInline>
            //   <Button
            //     onClick={(e) => auth.signinWithGitHub()}
            //     backgroundColor="gray.900"
            //     color="white"
            //     fontWeight="medium"
                
            //     _hover={{ bg: 'gray.700' }}
            //     _active={{
            //       bg: 'gray.800',
            //       transform: 'scale(0.95)'
            //     }}
            //   >
            //     Sign In with GitHub
            //   </Button>
            //   <Button
            //     onClick={(e) => auth.signinWithGoogle()}
            //     backgroundColor="white"
            //     color="gray.900"
            //     variant="outline"
            //     fontWeight="medium"
                
            //     _hover={{ bg: 'gray.100' }}
            //     _active={{
            //       bg: 'gray.100',
            //       transform: 'scale(0.95)'
            //     }}
            //   >
            //     Sign In with Google
            //   </Button>
            // </Stack>
          )}
        </Flex>
      </Box>
    </HomePageLayout>
  );
};

export default SellerDashboard;