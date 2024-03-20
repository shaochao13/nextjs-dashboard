import { sql } from "@vercel/postgres"
import { unstable_noStore as noStore } from "next/cache"
import { formatCurrency } from "./utils"

export async function fetchRevenue() {
  noStore()
  try {
    await new Promise(r => setTimeout(r, 3000))
    const data = await sql`select * from revenue`
    if (data && data.rows.length > 0) return data.rows
    else return null
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch revenue data.")
  }
}

export async function fetchLatestInvoices() {
  noStore()
  try {
    await new Promise(r => setTimeout(r, 1500))
    const data =
      await sql`SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
  FROM invoices
  JOIN customers ON invoices.customer_id = customers.id
  ORDER BY invoices.date DESC
  LIMIT 5`

    if (data && data.rows.length > 0) {
      const latestInvoices = data.rows.map(invoice => ({
        ...invoice,
        amount: formatCurrency(invoice.amount),
      }))

      return latestInvoices
    }

    return null
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch the latest invoices.")
  }
}

export async function fetchCardData() {
  noStore()
  try {
    await new Promise(r => setTimeout(r, 1000))
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ])

    if (data && data.length > 0) {
      const numberOfInvoices = Number(data[0].rows[0].count ?? "0")
      const numberOfCustomers = Number(data[1].rows[0].count ?? "0")
      const { paid, pending } = data[2].rows[0]
      const totalPaidInvoices = Number(paid ?? "0")
      const totalPendingInvoices = Number(pending ?? "0")

      return {
        numberOfCustomers,
        numberOfInvoices,
        totalPaidInvoices,
        totalPendingInvoices,
      }
    }
    return null
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch card data.")
  }
}

const ITEMS_PER_PAGE = 6
export async function fetchFilteredInvoices(query, currentPage) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  try {
    await new Promise(r => setTimeout(r, 1000))
    const invoices = await sql`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `
    return invoices.rows
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch invoices.")
  }
}

export async function fetchInvoicesPages(query) {
  noStore()
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `

    const totalPages = Math.ceil(count.rows[0].count / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of invoices.")
  }
}

export async function fetchInvoiceById(id) {
  noStore()
  try {
    const data = await sql`SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};`

    const invoice = data.rows.map(invoice => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }))

    return invoice[0]
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch invoice.")
  }
}

export async function fetchCustomers() {
  noStore()
  try {
    const data = await sql`SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC`

    return data.rows
  } catch (error) {
    console.error("Database Error:", err)
    throw new Error("Failed to fetch all customers.")
  }
}

export async function fetchFilteredCustomers(query) {
  noStore()
  try {
    const data = await sql`
        SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.image_url,
        COUNT(invoices.id) AS total_invoices,
        SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
        SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM customers
      LEFT JOIN invoices ON customers.id = invoices.customer_id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
          customers.email ILIKE ${`%${query}%`}
      GROUP BY customers.id, customers.name, customers.email, customers.image_url
      ORDER BY customers.name ASC
    `
    const customers = data.rows.map(customer => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }))

    return customers
  } catch (error) {
    console.error("Database Error:", err)
    throw new Error("Failed to fetch customer table.")
  }
}

export async function getUser(email) {
  noStore()
  try {
    const user = await sql`select * from users where email=${email}`
    if (user && user.rows.length > 0) return user.rows[0]
    else return null
  } catch (error) {
    console.error("Failed to fetch user: ", error)
    throw new Error("Failed to fetch user.")
  }
}
