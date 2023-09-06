import cookie from "cookie";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getRole } from "apps/web/services/auth";

export const withAuth = (getServerSidePropsFunc?: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
    const parsedCookies = cookie.parse(context.req.headers.cookie || "");
    const token = parsedCookies.token;
    const role = await getRole(token);

    if (!role) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
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
        },
      };
    } else {
      return {
        ...originalProps,
        props: {
          role,
        },
      };
    }
  };
};
