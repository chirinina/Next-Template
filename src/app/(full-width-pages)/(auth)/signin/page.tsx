import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diolay  SignIn Page | Diolay  ",
  description: "This is Diolay  Signin Page ",
};

export default function SignIn() {
  return <SignInForm />;
}
