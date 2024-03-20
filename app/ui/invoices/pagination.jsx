"use client"

import { generatePagination } from "@/app/lib/utils"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

function PaginationArrow({ href, direction, isDisabled }) {
  const classname = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  )

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className=" w-4" />
    ) : (
      <ArrowRightIcon className=" w-4" />
    )

  return isDisabled ? (
    <div className={classname}>{icon}</div>
  ) : (
    <Link href={href} className={classname}>
      {icon}
    </Link>
  )
}

function PaginationNumber({ page, href, isActive, position }) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-blue-600 border-blue-600 text-white": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  )

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  )
}

const Pagination = ({ totalPages }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentPage = Number(searchParams.get("page") || 1)

  const createPageUrl = pageNumber => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const allPages = generatePagination(currentPage, totalPages)
  return (
    <>
      <div className=" inline-flex">
        <PaginationArrow
          direction="left"
          isDisabled={currentPage <= 1}
          href={createPageUrl(currentPage - 1)}
        />
        <div className="flex -space-x-px">
          {allPages?.map((page, index) => {
            let position
            if (index === 0) position = "first"
            else if (index === allPages.length - 1) position = "last"
            if (allPages.length === 1) position = "single"
            if (page === "...") position = "middle"

            return (
              <PaginationNumber
                key={page}
                href={createPageUrl(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            )
          })}
        </div>
        <PaginationArrow
          direction="right"
          href={createPageUrl(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  )
}

export default Pagination
