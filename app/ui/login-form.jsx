import { Button } from "@/app/ui/buttons"
import {
  ArrowRightIcon,
  AtSymbolIcon,
  KeyIcon,
} from "@heroicons/react/24/outline"

const LoginForm = () => {
  return (
    <form>
      <div>
        <h1>Please log in to continue.</h1>
        <div className=" w-full">
          <div>
            <label
              htmlFor="email"
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                className=" peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <AtSymbolIcon className="h-[18px] w-[18px] pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className=" mt-4">
            <label
              htmlFor="password"
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            >
              Password
            </label>
            <div className=" relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <LoginButton />
        <div></div>
      </div>
    </form>
  )
}

export default LoginForm

function LoginButton() {
  return (
    <Button className="mt-4 w-full">
      Log in <ArrowRightIcon className=" h-5 w-5 ml-auto text-gray-50" />
    </Button>
  )
}
