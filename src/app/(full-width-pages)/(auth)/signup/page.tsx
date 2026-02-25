import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diolay  SignUp Page | Diolay  ",
  description: "This is Diolay  SignUp Page ",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
