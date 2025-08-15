'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  TrendingUp, 
  Heart, 
  User, 
  Trash2,
  ArrowLeft,
  DollarSign 
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface DashboardLayoutProps {
  userType: 'buyer' | 'seller'
  username: string
  children: React.ReactNode
  currentSection: string
  onSectionChange: (section: string) => void
}

const DashboardLayout = ({ 
  userType, 
  username, 
  children, 
  currentSection, 
  onSectionChange 
}: DashboardLayoutProps) => {
  const router = useRouter()

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      description: 'Overview and stats'
    },
    {
      id: 'dealPipeline',
      label: 'Deal Pipeline',
      icon: DollarSign,
      description: 'Track your deals'
    },
    {
      id: 'swipe',
      label: 'Browse Deals',
      icon: Heart,
      description: 'Swipe through deals'
    }
  ]

  const handleDeleteProfile = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your profile? This action cannot be undone.'
    )
    
    if (confirmed) {
      try {
        const { deleteUserProfile, clearAuth } = await import('../utils/api')
        await deleteUserProfile()
        clearAuth()
        alert('Your profile has been successfully deleted.')
        window.location.href = '/'
      } catch (error: any) {
        console.error('Error deleting profile:', error)
        alert(`Failed to delete profile: ${error.message || 'Please try again.'}`)
      }
    }
  }

  const handleAdjustPreference = () => {
    if (userType === 'buyer') router.push('/buyerOnboarding')
    else router.push('/sellerOnboarding')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
            <Badge variant="outline" className="capitalize">
              {userType} Dashboard
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {username}!
          </h1>
          <p className="text-muted-foreground">
            {userType === 'seller' 
              ? "Here's how your business listing is performing" 
              : "Discover new acquisition opportunities"}
          </p>
        </motion.div>

        {/* Mini Navigation Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = currentSection === item.id
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        onClick={() => onSectionChange(item.id)}
                        className={`
                          group relative flex items-center gap-2 px-4 py-2 transition-all duration-300
                          ${isActive 
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105' 
                            : 'hover:bg-secondary/80 hover:scale-105'
                          }
                        `}
                      >
                        <Icon className={`h-4 w-4 ${isActive ? 'scale-110' : ''} transition-transform`} />
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full" />
                        )}
                      </Button>
                    </motion.div>
                  )
                })}

                {/* Adjust Preference Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAdjustPreference}
                    className="group relative flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:bg-secondary/80 hover:scale-105"
                  >
                    <span className="font-medium">Adjust Preference</span>
                  </Button>
                </motion.div>
              </div>

              {/* Delete Profile Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDeleteProfile}
                  className="group relative flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:bg-destructive/10 hover:text-destructive hover:scale-105 border-destructive/20"
                >
                  <Trash2 className="h-4 w-4 transition-transform" />
                  <span className="font-medium">Delete Profile</span>
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Content */}
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardLayout
