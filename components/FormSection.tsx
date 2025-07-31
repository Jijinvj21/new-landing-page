"use client"

import { useState } from "react"
import LeadForm from "./ui/LeadForm"
import pattern from "../public/pattern1.png"
import logo from "../public/og-img.svg"

export default function FormSection() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url('${pattern.src}')`,
    }}>
      {/* LEFT SIDE - TEXT CONTENT WITH LOGO */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-lg p-8 md:p-0 text-[#f8e4d2] text-center md:text-left">
          {/* Logo at top - centered and moved up */}
          <div className="mb-12 md:mb-20">
            <img 
              src={logo.src}
              alt="Logo" 
              className="h-12 w-auto mx-auto md:mx-0"
            />
          </div>
          
          {/* Text content */}
          <div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              GREAT! YOU ARE ONE STEP CLOSER TO ACHIEVING YOUR <span className="text-[#ff8ad0]">MONEY GOALS.</span>
            </h2>
            <p className="text-lg mb-8">
              Fill in your details so we can keep you in the loop about events, 
              <br />tips, and conversations that actually matter.
            </p>
            <div className="h-px w-full"></div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center">
        <div className="max-w-md w-full">
          <LeadForm />
        </div>
      </div>
    </div>
  )
}