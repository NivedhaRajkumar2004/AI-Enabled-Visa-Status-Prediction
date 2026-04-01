"use client"

import { useEffect, useRef } from "react"

interface NeuralNetworkProps {
  width?: number
  height?: number
  className?: string
}

export function NeuralNetwork({ width = 400, height = 300, className = "" }: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Neural network structure
    const layers = [4, 6, 6, 3] // Input, hidden1, hidden2, output
    const nodes: { x: number; y: number; layer: number; pulse: number }[] = []
    const connections: { from: number; to: number; signal: number; active: boolean }[] = []

    // Calculate node positions
    const layerSpacing = width / (layers.length + 1)
    let nodeIndex = 0

    layers.forEach((nodeCount, layerIndex) => {
      const nodeSpacing = height / (nodeCount + 1)
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: layerSpacing * (layerIndex + 1),
          y: nodeSpacing * (i + 1),
          layer: layerIndex,
          pulse: Math.random() * Math.PI * 2
        })
        nodeIndex++
      }
    })

    // Create connections between adjacent layers
    let startIndex = 0
    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerSize = layers[l]
      const nextLayerSize = layers[l + 1]
      const nextLayerStart = startIndex + currentLayerSize

      for (let i = 0; i < currentLayerSize; i++) {
        for (let j = 0; j < nextLayerSize; j++) {
          connections.push({
            from: startIndex + i,
            to: nextLayerStart + j,
            signal: 0,
            active: Math.random() > 0.3
          })
        }
      }
      startIndex += currentLayerSize
    }

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      time += 0.02

      // Draw connections
      connections.forEach((conn) => {
        if (!conn.active) return

        const fromNode = nodes[conn.from]
        const toNode = nodes[conn.to]

        // Update signal position
        conn.signal = (conn.signal + 0.01) % 1

        // Draw connection line
        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.strokeStyle = "rgba(34, 211, 238, 0.15)"
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw moving signal
        if (Math.random() > 0.99) conn.signal = 0
        
        const signalX = fromNode.x + (toNode.x - fromNode.x) * conn.signal
        const signalY = fromNode.y + (toNode.y - fromNode.y) * conn.signal

        ctx.beginPath()
        ctx.arc(signalX, signalY, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 211, 238, ${0.8 * (1 - Math.abs(conn.signal - 0.5) * 2)})`
        ctx.fill()
      })

      // Draw nodes
      nodes.forEach((node) => {
        node.pulse += 0.03
        const pulseSize = 1 + Math.sin(node.pulse) * 0.3

        // Outer glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, 12 * pulseSize
        )
        gradient.addColorStop(0, "rgba(34, 211, 238, 0.4)")
        gradient.addColorStop(1, "transparent")
        ctx.beginPath()
        ctx.arc(node.x, node.y, 12 * pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Inner node
        ctx.beginPath()
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = node.layer === 0 ? "#22d3ee" : 
                       node.layer === layers.length - 1 ? "#10b981" : "#06b6d4"
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationRef.current)
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
    />
  )
}
