import React from 'react';
import { Box, Link, Switch, useToast } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';
import { parseISO, format } from 'date-fns';
import NextLink from 'next/link';
import { editAd } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import { mutate } from 'swr';

const SiteTable = ({ ads }: any) => {
  const toast = useToast();
  const auth: any = useAuth();
  
  const changeActiveStatusAd = async (adId: string, status: boolean) => {
    let newStatus = status ? 'Attivato' : 'Disattivato';
    await editAd({active: status}, adId);
      //.then((_) => {
        mutate([`/api/ads`, auth.user.token]);
        toast({
          title: 'Success!',
          description: "Annuncio " + newStatus,
          status: 'success',
          duration: 5000,
          isClosable: true
          });
  //    })
  }

  return (
    <>
      <Table>
      <thead>
        <Tr>
          <Th>Title</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th> 
          <Th>Date Added</Th>
          <Th>Attivo</Th>
          <Th width="50px">{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {ads.map((ad: any) => (
          <NextLink key={ad.id} href='/seller-dashboard/[siteId]' as={`/seller-dashboard/${ad.id}`} passHref>
            <Box as="tr" >
              <Td fontWeight="medium">{ad.title}</Td>
              <Td>{ad.url}</Td>
              <Td>
                <NextLink href='/seller-dashboard/[siteId]' as={`/seller-dashboard/${ad.id}`} passHref>
                  <Link color="blue.500" fontWeight="medium">
                    View Feedback
                  </Link>
                </NextLink>
              </Td>
              <Td>{format(parseISO(ad.createdAt), 'PPpp')}</Td>
              <Td> <Switch size="lg" isChecked={ad.active} onChange={(e) => changeActiveStatusAd(ad.id, e.target.checked)}/></Td>
            </Box>
          </NextLink>

        ))}
      </tbody>
    </Table>
    </>

  );
};

export default SiteTable;