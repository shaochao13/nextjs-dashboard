import clsx from "clsx"
import Link from "next/link"
import { lusitana } from "../font"

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <nav aria-label="Breadcrumb" className=" mb-6 block">
      <ol className={clsx(lusitana.className, "flex text-xl md:text-2xl")}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            className={clsx(
              breadcrumb.active ? "text-gray-900" : "text-gray-500"
            )}
            aria-current={breadcrumb.active}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 && (
              <span className=" mx-3 inline-block">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
