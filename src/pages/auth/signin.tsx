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
        <h1 className=" text-3xl font-semibold text-primary">Spreddit</h1>
      </div>
      {route.query.error ? (
        <div className=" flex w-64 items-center justify-center rounded-md border border-red-600 bg-red-100 p-2 text-sm text-red-600">
          {route.query.error.toString() === "OAuthAccountNotLinked"
            ? "The email is already in use with another account. Please login with the original provider to continue."
            : ""}
        </div>
      ) : (
        <></>
      )}
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
                onClick={async () => {
                  await signIn(provider.id, {
                    redirect: true,
                    callbackUrl: route.query.callbackUrl?.toString(),
                  });
                  // .catch((error) => {
                  //   console.log("ERROR:", error.message);
                  // });
                }}
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
