import React, {PropsWithChildren, ReactElement} from 'react';
import {NextPage} from "next";
import {Layout} from "@/components/Layout/Layout";

export const BaseLayout: NextPage<PropsWithChildren> = ({children}) => {
  return <Layout>{children}</Layout>
};

export const getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>


