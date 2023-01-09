import { type GetServerSideProps } from "next";
import { type BuiltInProviderType } from "next-auth/providers";
import {
  type ClientSafeProvider,
  // getCsrfToken,
  getProviders,
  type LiteralUnion,
  signIn,
} from "next-auth/react";
import { useRouter } from "next/router";
import { FaReddit } from "react-icons/fa";

const SignIn = ({
  providers,
}: // csrfToken,
{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  // csrfToken: string | undefined;
}) => {
  const route = useRouter();
  return (
    <div className=" flex min-h-screen flex-col items-center justify-center gap-3 bg-lightest">
      <div className=" flex gap-2">
        <FaReddit className=" text-primary" size={40} />
        <h1 className=" hidden text-3xl font-semibold text-primary md:block">
          Spreddit
        </h1>
      </div>
      <div className=" flex w-64 flex-col gap-2 rounded-md border border-primary p-2">
        {providers &&
          Object.values(providers).map((provider) => (
            <div
              className=" rounded-sm border border-primary bg-primary p-2 text-white hover:cursor-pointer hover:bg-lighter hover:text-black"
              key={provider.name}
            >
              <button
                className=" w-full text-center"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={async () =>
                  await signIn(provider.id, {
                    redirect: true,
                    callbackUrl: route.query.callbackUrl?.toString(),
                  })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async () =>
  // context
  {
    const providers = await getProviders();
    // const csrfToken = await getCsrfToken(context);
    return {
      props: {
        providers,
        // csrfToken,
      },
    };
  };
