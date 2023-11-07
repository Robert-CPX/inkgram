import { toast } from "@/components/ui/use-toast"
import { SigninValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loader from "@/components/shared/Loader"
import { useSigninWithEmailAccount } from "@/lib/tanstack-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

const SigninForm = () => {
  const navigate = useNavigate()
  const { mutateAsync: signinWithEmail } = useSigninWithEmailAccount()
  const { checkAuthUser, isLoading: isUserLogingIn } = useUserContext()
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signinWithEmail(values)
    if (!session) {
      return toast({ title: "Sign in failed, Please try again later" })
    }
    const isLoggedIn = await checkAuthUser()
    if (!isLoggedIn) {
      return toast({ title: "Sign in failed, Please try again later" })
    }
    if (isLoggedIn) {
      form.reset()
      console.log(session)
      navigate('/home')
    } else {
      return toast({ title: "Sign in failed, Please try again later" })
    }
  }

  return (
    <Form {...form}>
      <div className="flex-center flex-col sm:w-420 ">
        <img src="assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in to your account</h2>
        <p className="md:base-regular small-medium mt-2 text-light-3">Welcome back! Please enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex w-full flex-col gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
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
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary w-full" type="submit">
            {isUserLogingIn ? (
              <div className="flex-center gap-2"><Loader /> Loading...</div>
            ) : (
              "Sign in"
            )}
          </Button>
          <p className="small-regular mt-2 text-center text-light-2">
            Don&apos;t have an account? <Link to='/sign-up' className="small-semibold ml-1 text-primary-500">Sign up</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm