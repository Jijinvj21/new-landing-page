import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" })
  }

  const {
    firstName,
    lastName,
    phone,
    email,
    company,
    linkedin,
    age,
    city,
  } = req.body

  // Basic validation (you already have this on frontend, but good to double-check)
  if (!firstName || !lastName || !phone || !email || !age || !city) {
    return res.status(400).json({ success: false, error: "Missing required fields" })
  }

  try {
    // Check if lead already exists
    const existingLead = await prisma.lead.findFirst({
      where: {
        OR: [
          { email: email },
          { phone: phone },
        ],
      },
    })

    if (existingLead) {
      return res.status(409).json({
        success: false,
        error: "A lead with this email or phone already exists.",
      })
    }

    // Create new lead
    const newLead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
        company: company || null,
        linkedin: linkedin || null,
        age,
        city,
      },
    })

    return res.status(200).json({ success: true, lead: newLead })
  } catch (error) {
    console.error("Lead creation failed:", error)
    return res.status(500).json({ success: false, error: "Server error. Please try again later." })
  }
}
