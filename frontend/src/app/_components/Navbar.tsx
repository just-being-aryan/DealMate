"use client"

import Link from "next/link"
import { User, Menu, X, ChevronDown, Search } from "lucide-react"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/app/sellerDashboard/navigation-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "../theme-toggle"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "#home", badge: null },
    { name: "Features", href: "#features", badge: "New" },
    { name: "About Us", href: "#about", badge: null },
    { name: "Analytics", href: "#analytics", badge: null },
    { name: "Testimonials", href: "#testimonials", badge: null }
  ]

  return (
    <nav
      className={cn(
        "w-full border-b backdrop-blur-md bg-background/95 sticky top-0 z-50",
        "shadow-sm"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            DealMate
          </span>
        </div>

   
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="px-4 py-2 text-sm font-medium text-foreground/80 hover:underline"
                    >
                      <span className="flex items-center gap-2">
                        {item.name}
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-primary/20 text-primary border-primary/30"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

     
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

        
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <ChevronDown className="w-3 h-3" />
            </Button>
          </div>

      
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>


      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/98 backdrop-blur-md">
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:underline"
              >
                <div className="flex items-center justify-between">
                  <span>{item.name}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-primary/20 text-primary"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            ))}

          
            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Search className="w-4 h-4" />
                Search Deals
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}