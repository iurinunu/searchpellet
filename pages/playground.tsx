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
  Icon,
  Center,
  Text
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';
import LogoIcon from '@/components/LogoIcon';
import { Select } from '@/components/Forms/Select';
import FormUsage from '@/components/Forms/FormUsage';
import Counter from 'features/counter/Counter';
import StockTracker from '@/components/StockTracker';
import Ticker from '@/components/Ticker';




const Playground = ({ children }: any) => {

    const onSubmit = (data: any) => console.log(data);

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
            <NextLink href="/" passHref>
              <Link>
              <LogoIcon color={"black"} />
              </Link>
            </NextLink>
            <NextLink href="/dashboard" passHref>
              <Link mr={4}>Sites</Link>
            </NextLink>
            <NextLink href="/feedback" passHref>
              <Link>Feedback</Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
          <LogoIcon color={"red"} />
          </Flex>
        </Flex>
      </Flex>


      <Ticker/>

      <Flex margin={8} wrap='wrap' gap={10}>
{/* margin="0 auto" direction="column" maxW="1250px" px={8} */}
        <Center >
            <Counter />
        </Center>  
        <Center >
            <FormUsage />
        </Center>
        <Center >
            <FormUsage />
        </Center>
        <Center >
            <FormUsage />
        </Center>

        <Center >
            <FormUsage />
        </Center>
      </Flex>
    </Box>
  );
};

export default Playground;