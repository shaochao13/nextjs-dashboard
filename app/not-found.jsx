import Link from "next/link"

const NotFund = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        className=" mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        href="/"
      >
        Return Home
      </Link>
    </div>
  )
}

export default NotFund
