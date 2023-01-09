import { type GetServerSideProps } from "next";
import { type BuiltInProviderType } from "next-auth/providers";
import {
  type ClientSafeProvider,
  getCsrfToken,
  getProviders,
  type LiteralUnion,
  signIn,
} from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaReddit } from "react-icons/fa";

const SignIn = ({
  providers,
  csrfToken,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  csrfToken: string | undefined;
}) => {
  const route = useRouter();
  return (
    <div className=" flex min-h-screen flex-col items-center justify-center gap-3 bg-lightest">
      <Link href={"/"} className=" flex gap-2">
        <FaReddit className=" text-primary" size={40} />
        <h1 className=" text-3xl font-semibold text-primary">Spreddit</h1>
      </Link>
      {route.query.error ? (
        <div className=" flex w-64 items-center justify-center rounded-md border border-red-600 bg-red-100 p-2 text-sm text-red-600">
          {route.query.error.toString() === "OAuthAccountNotLinked"
            ? "The email is already in use with another account. Please login with the original provider to continue."
            : `${route.query.error}`}
        </div>
      ) : (
        <></>
      )}
      <div className=" flex w-72 flex-col gap-2 rounded-md border border-primary p-2">
        <form method="post" action="/api/auth/signin/email">
          <input name="csrfToken" type={"hidden"} defaultValue={csrfToken} />
          <div className=" mb-2 flex items-center justify-center gap-2">
            <label htmlFor="email">Email:</label>
            <input
              type={"email"}
              id="email"
              className=" flex-grow rounded-sm border border-primary p-1"
              name="email"
            />
          </div>
          <div className=" rounded-sm border border-primary bg-primary p-2 text-white hover:cursor-pointer hover:bg-lighter hover:text-black">
            <button className=" w-full text-center" type="submit">
              Sign in with Email
            </button>
          </div>
        </form>
        <div className=" inline-flex w-full items-center justify-center">
          <hr className=" my-1 h-px w-full border-0 bg-primary" />
          <span className=" absolute left-1/2 -translate-x-1/2 bg-lightest px-3 font-medium text-primary ">
            or
          </span>
        </div>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken,
    },
  };
};
