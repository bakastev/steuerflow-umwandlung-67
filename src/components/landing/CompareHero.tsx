"use client"

import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Star, Users, Clock, ArrowRight, ArrowLeftRight } from "lucide-react"
import { Shield, Award, CheckCircle } from "lucide-react"

export const CompareHero = () => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [hasInteracted, setHasInteracted] = useState(false)
  
  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width))
    const percentage = (x / rect.width) * 100
    setSliderPosition(percentage)
    if (!hasInteracted) setHasInteracted(true)
  }

  return (
    <section className="relative py-12 md:py-20 bg-primary-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-16 text-white">
          Verkaufspsychologisch optimierte Webseiten für mehr Wirkung und Conversion
        </h2>
        
        <div 
          className="relative h-[800px] md:h-[600px] w-full cursor-col-resize"
          onMouseMove={handleMouseMove}
        >
          {/* Standard Hero */}
          <div className="absolute inset-0 bg-gray-50">
            <div className="container h-full mx-auto px-4 flex items-center">
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
                  Ihre Anwaltskanzlei für alle Rechtsfragen
                </h1>
                <p className="text-base md:text-lg text-gray-600 mb-8 max-w-xl mx-auto">
                  Kompetente rechtliche Beratung für Privatpersonen und Unternehmen. 
                  Wir unterstützen Sie bei allen rechtlichen Anliegen.
                </p>
                <Button variant="default" className="bg-primary text-white">
                  Kontakt
                </Button>
              </div>
            </div>
          </div>

          {/* Optimierter Hero */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary-dark"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <div className="container h-full mx-auto px-4">
              <div className="flex h-full flex-col lg:flex-row items-center justify-between">
                <div className="w-full lg:max-w-2xl px-4 py-8 lg:py-0">
                  <div className="flex items-center gap-2 md:gap-4 mb-6 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 md:w-5 h-4 md:h-5 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 md:w-5 h-4 md:h-5 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 md:w-5 h-4 md:h-5 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 md:w-5 h-4 md:h-5 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 md:w-5 h-4 md:h-5 text-yellow-400 fill-yellow-400" />
                    </div>
                    <span className="text-sm md:text-base text-white/80">4.9/5 bei Google (127 Bewertungen)</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    Ihr Experte für Arbeitsrecht in München
                  </h1>
                  
                  <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 md:w-5 h-4 md:h-5 text-accent" />
                      <span className="text-sm md:text-base text-white/80">2.500+ zufriedene Mandanten</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 md:w-5 h-4 md:h-5 text-accent" />
                      <span className="text-sm md:text-base text-white/80">Erstberatung in 24h</span>
                    </div>
                  </div>
                  
                  <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
                    Sichern Sie sich jetzt Ihr Recht am Arbeitsplatz mit unserer Expertise
                  </p>
                  
                  <Button 
                    size="lg"
                    className="w-full sm:w-auto bg-accent text-primary-dark hover:bg-accent/90 group"
                  >
                    Kostenlose Erstberatung sichern
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>

                  <div className="mt-8 grid grid-cols-3 gap-4 md:gap-8">
                    <div className="flex flex-col items-center gap-2">
                      <Shield className="w-8 md:w-12 h-8 md:h-12 text-accent" />
                      <span className="text-xs md:text-sm text-white/80 text-center">Geprüfte Qualität</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Award className="w-8 md:w-12 h-8 md:h-12 text-accent" />
                      <span className="text-xs md:text-sm text-white/80 text-center">Top Bewertungen</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <CheckCircle className="w-8 md:w-12 h-8 md:h-12 text-accent" />
                      <span className="text-xs md:text-sm text-white/80 text-center">Zertifiziert</span>
                    </div>
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="hidden lg:block w-1/3"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
                    alt="Professioneller Rechtsberater" 
                    className="rounded-lg shadow-2xl object-cover h-[400px] w-full"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Slider Handle mit Hinweis */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize group"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="w-1 h-4 bg-gray-400 rounded-full" />
            </div>
            {!hasInteracted && (
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-primary-dark px-4 py-2 rounded-lg shadow-lg -mt-16 flex items-center gap-2 text-sm md:text-base">
                <ArrowLeftRight className="w-4 h-4" />
                Bewegen Sie mich zum Vergleichen
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm md:text-base text-white/80">
            Bewegen Sie den Slider, um den Unterschied zwischen Standard und optimiertem Design zu sehen
          </p>
        </div>
      </div>
    </section>
  )
}