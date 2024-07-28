import Navbar from "@/components/common/Navbar";
import UserRegForm from "@/components/UserRegForm";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import RegistrationContextProvider from "@/components/context/RegistrationContextProvider";

type Props = {
  user: {
    id: string;
    phoneNumber: string;
  };
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !session.user?.isNewUser) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        id: session.user.id,
        phoneNumber: session.user.phoneNumber,
      },
    },
  };
};

const SignUp = ({ user }: Props) => {
  return (
    <div className="flex flex-col bg-slate-50 min-h-screen ">
      <Navbar />
      <div className="flex grow">
        <div className="container mt-12 gap-6 flex flex-col">
          <h1 className="text-3xl font-bold capitalize">
            Membership registration form
          </h1>
          <RegistrationContextProvider>
            <UserRegForm {...user} />
          </RegistrationContextProvider>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
