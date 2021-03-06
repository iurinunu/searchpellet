import { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import DashboardShell from '@/components/DashboardShell';

const Account = () => {
  const { user, signout } = useAuth();
  const [isCheckoutLoading, setCheckoutLoading] = useState(false);
  const [isBillingLoading, setBillingLoading] = useState(false);

  return (
    <DashboardShell>
      <Box>
        <Button
          onClick={() => {
            setCheckoutLoading(true);
          }}
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          isLoading={isCheckoutLoading}
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)'
          }}
        >
          Upgrade to Starter
        </Button>
        <Button
          onClick={() => {
            setBillingLoading(true);
          }}
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          ml={4}
          isLoading={isBillingLoading}
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)'
          }}
        >
          View Billing Portal
        </Button>
        <Button ml={4} onClick={() => signout()}>
          Log Out
        </Button>
      </Box>
    </DashboardShell>
  );
};

export default Account;