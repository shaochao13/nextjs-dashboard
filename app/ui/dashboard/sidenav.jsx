import Link from "next/link"
import AcmeLogo from "../acme-logo"
import NavLinks from "./nav-links"

const SideNav = () => {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        href="/"
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div>
        <div>
          <NavLinks />
        </div>
      </div>
    </div>
  )
}

export default SideNav
