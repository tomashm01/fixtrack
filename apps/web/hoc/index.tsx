import cookie from 'cookie';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next';
import { getRole } from 'apps/web/services/auth';

export const withAuth = (
  allowedRoles: string[],
  getServerSidePropsFunc?: GetServerSideProps
) => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<any>> => {
    const parsedCookies = cookie.parse(context.req.headers.cookie || '');
    const token = parsedCookies.token;
    const { role, id }: any = await getRole(token);

    if (!role || !allowedRoles.includes(role)) {
      return {
        redirect: {
          destination: role ? '/dashboard' : '/login',
          permanent: false
        }
      };
    }

    let originalProps: GetServerSidePropsResult<any> = { props: {} };
    if (getServerSidePropsFunc) {
      originalProps = await getServerSidePropsFunc(context);
    }

    if ('props' in originalProps) {
      return {
        ...originalProps,
        props: {
          ...originalProps.props,
          role,
          id
        }
      };
    } else {
      return {
        ...originalProps,
        props: {
          role,
          id
        }
      };
    }
  };
};
