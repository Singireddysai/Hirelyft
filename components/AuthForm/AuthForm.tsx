"use client";
import "./AuthForm.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import FormFeild from "../FormFeild/FormFeild";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

const AuthFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up"
        ? z
            .string()
            .min(2, "Name must be at least 2 characters long")
            .max(50, "Name must be under 50 characters")
        : z.string().optional(),
    email: z
      .string()
      .email("Invalid email format")
      .min(5, "Email must be at least 5 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = AuthFormSchema(type);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-in") {
        const { email, password } = values;
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign-in failed bro!");
          return;
        }
        await signIn({
          email,
          idToken,
        });

        toast.success("Successfully signed-in.");
        router.push("/");
      } else {
        const { name, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const results = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });

        if (!results?.success) {
          toast.error(results?.message);
          return;
        }
        toast.success("Account created successfully. Please Sign-in.");
        console.log("Sign-Up", values);
        router.push("/sign-in");
      }
    } catch (error) {
      console.log(error);
      toast(`The error is :${error}`);
    }
  }
  const isSignIn = type === "sign-in";
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="auth-card">
        <div className="AuthForm lg:min-w-[433px]">
          <div className="card px-10 py-5 text-2xl font-[600] tracking-[1px] text-[var(--col2)]">
            <Image
              className="mr-2"
              src="/chat-logo.svg"
              alt="logo"
              height={36}
              width={36}
            />
            InterviewAssist
          </div>
          <div className="card text-lg -mt-3 font-[400] tracking-[1px]">
            Practice Interviews with AI
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-5 space-y-2 mt-5 flex flex-col gap-2"
            >
              {!isSignIn && (
                <FormFeild
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                />
              )}
              <FormFeild
                control={form.control}
                name="email"
                label="Email"
                placeholder="Your email address"
              />
              <FormFeild
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />

              <Button className="text-black btn mt-4" type="submit">
                {isSignIn ? "Sign-in" : "Create an account"}
              </Button>
              <p className="card">
                {isSignIn
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <Link
                  className="font-bold text-[var(--col2)] ml-[4px]"
                  href={isSignIn ? "/sign-up" : "/sign-in"}
                >
                  {isSignIn ? "Register" : "Sign-in"}
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
