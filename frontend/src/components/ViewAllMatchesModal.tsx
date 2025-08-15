'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  X, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin,
  Building,
  DollarSign,
  Calendar,
  Heart
} from 'lucide-react'
import { useSwipedMatches, SwipedMatch } from '@/contexts/SwipedMatchesContext'

interface ViewAllMatchesModalProps {
  isOpen: boolean
  onClose: () => void
  userType: 'buyer' | 'seller'
}

const ViewAllMatchesModal: React.FC<ViewAllMatchesModalProps> = ({ 
  isOpen, 
  onClose, 
  userType 
}) => {
  const { rightSwipedMatches, removeMatch } = useSwipedMatches()

  const handleRemoveMatch = (matchId: string) => {
    removeMatch(matchId)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-background rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-card">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {userType === 'seller' ? 'Your Matched Buyers' : 'Your Matched Deals'}
              </h2>
              <p className="text-muted-foreground mt-1">
                {rightSwipedMatches.length} {rightSwipedMatches.length === 1 ? 'match' : 'matches'} found
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-10 w-10 rounded-full hover:bg-secondary"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {rightSwipedMatches.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No matches yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start swiping right on {userType === 'seller' ? 'buyers' : 'deals'} you're interested in!
                </p>
                <Button onClick={onClose} variant="outline">
                  Start Browsing
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {rightSwipedMatches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-all duration-300 relative group">
                      {/* Remove button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive/10 hover:bg-destructive/20"
                        onClick={() => handleRemoveMatch(match.id)}
                      >
                        <X className="h-4 w-4 text-destructive" />
                      </Button>

                      {/* Avatar and basic info */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <img
                            src={match.avatar}
                            alt={match.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-lg truncate">{match.name}</h3>
                            <Badge 
                              variant={match.badge === "Premium" ? "default" : "secondary"} 
                              className="text-xs shrink-0"
                            >
                              {match.badge}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {match.company}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {match.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{match.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Additional details */}
                      {match.value && (
                        <div className="flex items-center gap-2 mb-3">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0
                            }).format(match.value)}
                          </span>
                        </div>
                      )}

                      {match.location && (
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-muted-foreground">{match.location}</span>
                        </div>
                      )}

                      {match.industry && (
                        <div className="flex items-center gap-2 mb-4">
                          <Building className="h-4 w-4 text-purple-500" />
                          <span className="text-sm text-muted-foreground">{match.industry}</span>
                        </div>
                      )}

                      {match.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {match.description}
                        </p>
                      )}

                      {/* Action buttons */}
                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm" className="flex-1 gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Phone className="h-4 w-4" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {rightSwipedMatches.length > 0 && (
            <div className="flex items-center justify-between p-6 border-t bg-card">
              <p className="text-sm text-muted-foreground">
                {rightSwipedMatches.length} {rightSwipedMatches.length === 1 ? 'match' : 'matches'} • 
                Swipe right on more {userType === 'seller' ? 'buyers' : 'deals'} to grow your network
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={onClose}>
                  Continue Browsing
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ViewAllMatchesModal
