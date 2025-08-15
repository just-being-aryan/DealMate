"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/stateful-button"

export function StatefulButtonDemo() {
  const router = useRouter()


  const handleClick = async () => {
 
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    router.push("/User")
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 h-40">
      <Button
        onClick={handleClick}
        className="px-8 py-3 text-lg font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
      >
        Get Started
      </Button>
    </div>
  )
}
