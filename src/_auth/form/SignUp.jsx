import React from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "@/components/ui/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/api";
import { useAuth } from "@/lib/context/AuthContext";

const SignUp = () => {
  const { checkAuthUser, isLoading: isUserLoading } = useAuth();
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSignIn } =
    useSignInAccount();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();
  async function onSubmit(userData) {
    try {
      await createUserAccount(userData);
      await signInAccount(userData);
      const isLoggedIn = await checkAuthUser();
      console.log(isLoggedIn);
      if (!isLoggedIn) {
        console.log("why");
        throw new Error("Authentication failed. Please try again. ");
      }
      toast({
        title: "Signed up successfully. ",
      });
      navigate("/");
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: err.message,
      });
    } finally {
      form.reset();
    }
  }
  return (
    <Form {...form}>
      <div className="flex flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use view vista, Please enter your details.{" "}
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    {...field}
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder=" jd123"
                    {...field}
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder=" johndoe@example.com"
                    {...field}
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-y-4">
            <Button className="shad-button_primary " type="submit">
              {isCreatingUser || isSignIn || isUserLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
            <Button className="bg-white text-black" type="submit">
              Sign up with Google
            </Button>
            <p className="text-light-2/80 text-center text-small-regular">
              Already have an account?{" "}
              <Link
                className="text-bold-semibold text-primary-500 ml-1 underline"
                to="/signIn"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default SignUp;
