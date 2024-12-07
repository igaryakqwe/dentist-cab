import { searchParamsCache } from '@/utils/searchparams';
import React from 'react';
import EmployeeListingPage from './_components/employee-listing-page';
import { SearchParams } from 'nuqs/server';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Dashboard : Employees',
};

export default async function Page({ searchParams }: pageProps) {
  searchParamsCache.parse(searchParams);

  return <EmployeeListingPage />;
}
