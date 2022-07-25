import React from 'react';

import HomePageLayout from '@/components/HomePageLayout';
import ClientSearchForm from '@/components/ClientSearchForm';




const HomePage = ({ children }: any) => {
  return (
    <HomePageLayout areaVenditori='true'>
      <ClientSearchForm />
    </HomePageLayout>
  );
};

export default HomePage;
