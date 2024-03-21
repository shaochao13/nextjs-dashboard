import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import Link from "next/link"

export function Button({ children, className, ...rest }) {
  return (
    <button
      {...rest}
      className={clsx(
        className,
        "flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      )}
    >
      {children}
    </button>
  )
}

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className=" flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className=" hidden md:block">Create Invoice</span>{" "}
      <PlusIcon className=" h-5 md:ml-4" />
    </Link>
  )
}

export function UpdateInvoice({ id }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className=" rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className=" w-5" />
    </Link>
  )
}

export function DeleteInvoice({ id }) {
  return (
    <>
      <button className=" rounded-md border p-2 hover:bg-gray-100">
        <span className=" sr-only">Delete</span>
        <TrashIcon className=" w-5" />
      </button>
    </>
  )
}
