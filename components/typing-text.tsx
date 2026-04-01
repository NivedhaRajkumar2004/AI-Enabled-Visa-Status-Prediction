"use client"

import { useEffect, useState } from "react"

interface TypingTextProps {
  texts: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function TypingText({ 
  texts, 
  className = "", 
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseDuration)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false)
        setTextIndex((prev) => (prev + 1) % texts.length)
        return
      }

      const deleteTimeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1))
      }, deletingSpeed)
      return () => clearTimeout(deleteTimeout)
    }

    if (displayText === currentText) {
      setIsPaused(true)
      return
    }

    const typeTimeout = setTimeout(() => {
      setDisplayText(currentText.slice(0, displayText.length + 1))
    }, typingSpeed)

    return () => clearTimeout(typeTimeout)
  }, [displayText, textIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse text-primary">|</span>
    </span>
  )
}
