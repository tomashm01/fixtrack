import React from 'react';
import cookie from 'cookie';
import { GetServerSideProps } from 'next';

import Landing from './landing';
import { getRole } from '../services/auth';

const Index = ({ role, id }: any) => {
  return <Landing />;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const parsedCookies = cookie.parse(context.req.headers.cookie || '');
  const token = parsedCookies.token;

  if (!token) {
    return { props: {} };
  }

  const { role, id }: any = await getRole(token);

  if (!role) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    };
  }

  return {
    props: {
      role,
      id
    }
  };
};

export default Index;
