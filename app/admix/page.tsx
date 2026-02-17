"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface GeneratedName {
  fileName: string
  metadata: {
    size: string
    persona: string
    funnel: string
    archetype: string
    hook: string
    adDescription: string
    cta: string
    style: string
    variation: string
  }
  timestamp: number
}

const STORAGE_KEY = "adtax-generated-names"

export default function AdMixPage() {
  const [stats, setStats] = useState<Record<string, Record<string, number>>>({})
  const [totalGenerated, setTotalGenerated] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as GeneratedName[]
        const newStats: Record<string, Record<string, number>> = {
          bySize: {},
          byPersona: {},
          byFunnel: {},
          byArchetype: {},
          byHook: {},
          byCta: {},
          byStyle: {},
        }

        parsed.forEach((entry) => {
          if (entry.metadata.size) {
            newStats.bySize[entry.metadata.size] = (newStats.bySize[entry.metadata.size] || 0) + 1
          }
          if (entry.metadata.persona) {
            newStats.byPersona[entry.metadata.persona] = (newStats.byPersona[entry.metadata.persona] || 0) + 1
          }
          if (entry.metadata.funnel) {
            newStats.byFunnel[entry.metadata.funnel] = (newStats.byFunnel[entry.metadata.funnel] || 0) + 1
          }
          if (entry.metadata.archetype) {
            newStats.byArchetype[entry.metadata.archetype] = (newStats.byArchetype[entry.metadata.archetype] || 0) + 1
          }
          if (entry.metadata.hook) {
            newStats.byHook[entry.metadata.hook] = (newStats.byHook[entry.metadata.hook] || 0) + 1
          }
          if (entry.metadata.cta) {
            newStats.byCta[entry.metadata.cta] = (newStats.byCta[entry.metadata.cta] || 0) + 1
          }
          if (entry.metadata.style) {
            newStats.byStyle[entry.metadata.style] = (newStats.byStyle[entry.metadata.style] || 0) + 1
          }
        })

        setStats(newStats)
        setTotalGenerated(parsed.length)
      } catch (e) {
        console.error("Failed to load stats:", e)
      }
    }
  }, [])

  if (!mounted) {
    return null
  }

  const StatCard = ({ title, data }: { title: string; data: Record<string, number> }) => {
    const entries = Object.entries(data)
      .sort(([, a], [, b]) => b - a)

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <p className="text-sm text-muted-foreground">No data yet</p>
          ) : (
            <div className="space-y-2">
              {entries.map(([key, count]) => {
                const percentage = totalGenerated > 0 ? (count / totalGenerated) * 100 : 0
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-mono">{key}</span>
                      <span className="text-muted-foreground">{count}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Ad Mix Analytics</h1>
          <p className="text-muted-foreground">Analyze your generated ad file names</p>
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Total Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalGenerated}</p>
          </CardContent>
        </Card>

        {totalGenerated === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No file names generated yet. Generate some file names in the Generator page to see analytics here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard title="By Size" data={stats.bySize} />
            <StatCard title="By Persona" data={stats.byPersona} />
            <StatCard title="By Funnel" data={stats.byFunnel} />
            <StatCard title="By Archetype" data={stats.byArchetype} />
            <StatCard title="By Hook" data={stats.byHook} />
            <StatCard title="By CTA" data={stats.byCta} />
            <StatCard title="By Style" data={stats.byStyle} />
          </div>
        )}
      </div>
    </div>
  )
}
