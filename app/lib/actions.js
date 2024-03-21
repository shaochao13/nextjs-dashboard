"use server"

import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer",
  }),
  amount: z.coerce.number().gt(0, {
    message: "Please enter an amount greater than $0.",
  }),
  status: z.enum(["paid", "pending"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
})

const CreateInvoice = FormSchema.omit({ id: true, date: true })
const UpdateInvoice = FormSchema.omit({ date: true, id: true })

export async function createInvoice(prevState, formData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice",
    }
  }

  const { customerId, amount, status } = validatedFields.data
  const amountInCents = amount * 100
  const date = new Date().toISOString().split("T")[0]

  try {
    await sql`INSERT INTO INVOICES (customer_id, amount, status, date) VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    }
  }

  revalidatePath("/dashboard/invoices")
  redirect("/dashboard/invoices")
}

export async function updateInvoice(id, prevState, formData) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  })

  if (!validatedFields.success) {
    return {
      message: "Missing Fields. Failed to Update Invoice",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { customerId, amount, status } = validatedFields.data

  const amountInCents = amount * 100

  try {
    await sql`UPDATE INVOICES SET customer_id = ${customerId}, amount=${amountInCents}, status= ${status} where id=${id}`
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." }
  }

  revalidatePath("/dashboard/invoices")
  redirect("/dashboard/invoices")
}

export async function deleteInvoice(id) {
  throw new Error("Failed to Delete Invoice")
  try {
    await sql`DELETE FROM INVOICES WHERE id=${id}`
    revalidatePath("/dashboard/invoices")
    return {
      message: "Invoice Deleted Successfully",
    }
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." }
  }
}
