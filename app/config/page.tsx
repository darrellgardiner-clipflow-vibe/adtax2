"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Info, Edit, Lock, Download, Upload } from "lucide-react"
import { toast } from "sonner"
import { EditVariableDialog } from "@/components/EditVariableDialog"

interface Variable {
  name: string
  type: "dropdown" | "multiselect" | "text"
  values: string[]
  description?: string
}

interface Configuration {
  variables: Variable[]
  caseTransformation: "lowercase" | "uppercase" | "unchanged"
  separatorCharacter: string
  locked: boolean
}

interface ApiKey {
  id: string
  name: string
  status: "Live" | "Revoked"
  created: string
  used: number
}

const DEFAULT_CONFIG: Configuration = {
  variables: [
    { name: "Size", type: "multiselect", values: ["9x16", "4x5", "1x1", "9x16_video", "1x1_video"] },
    { name: "Persona", type: "dropdown", values: ["CREATOR", "AGENCY", "BUSINESS"] },
    { name: "Funnel", type: "dropdown", values: ["COLD", "WARM", "HOT"] },
    { name: "Archetype", type: "dropdown", values: ["PROBLEM_SOLUTION", "PROOF", "TESTIMONIAL", "DEMO", "COMPARISON", "TRANSFORMATION", "EDUCATIONAL", "FEATURE", "BENEFITS", "MEME_CULTURAL", "CONTRARIAN", "STORY", "REACTION", "BREAKDOWN", "LISTICLE"] },
    { name: "Hook", type: "dropdown", values: ["PAIN", "CURIOSITY", "BOLD_CLAIM", "PATTERN", "EMOTIONAL", "PROOF"] },
    { name: "CTA", type: "dropdown", values: ["TRIAL", "DEMO", "OPS_AUDIT", "WAITLIST", "LEARN_MORE"] },
    { name: "Style", type: "dropdown", values: ["HIFI", "LOFI", "PRODUCT", "BRANDED", "LIFE"] },
  ],
  caseTransformation: "lowercase",
  separatorCharacter: "_",
  locked: false,
}

const STORAGE_KEY = "adtax-config"
const API_KEYS_STORAGE_KEY = "adtax-api-keys"

export default function ConfigPage() {
  const [config, setConfig] = useState<Configuration>(DEFAULT_CONFIG)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: "figmapluginkey", name: "figmapluginkey", status: "Live", created: "11/21/2025", used: 0 },
  ])
  const [mounted, setMounted] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedVariable, setSelectedVariable] = useState<Variable | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
    const storedConfig = localStorage.getItem(STORAGE_KEY)
    if (storedConfig) {
      try {
        setConfig(JSON.parse(storedConfig))
      } catch (e) {
        console.error("Failed to load config:", e)
      }
    }

    const storedKeys = localStorage.getItem(API_KEYS_STORAGE_KEY)
    if (storedKeys) {
      try {
        setApiKeys(JSON.parse(storedKeys))
      } catch (e) {
        console.error("Failed to load API keys:", e)
      }
    }
  }, [])

  const saveConfig = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
    toast.success("Configuration saved", { position: "top-center" })
  }

  const deleteConfiguration = () => {
    if (confirm("Are you sure you want to delete the configuration? This cannot be undone.")) {
      setConfig(DEFAULT_CONFIG)
      localStorage.removeItem(STORAGE_KEY)
      toast.success("Configuration deleted", { position: "top-center" })
    }
  }

  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "adtax-config.json"
    link.click()
    toast.success("Configuration exported", { position: "top-center" })
  }

  const importConfig = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e: any) => {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event: any) => {
        try {
          const imported = JSON.parse(event.target.result)
          setConfig(imported)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(imported))
          toast.success("Configuration imported", { position: "top-center" })
        } catch (error) {
          toast.error("Failed to import configuration", { position: "top-center" })
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const createApiKey = () => {
    const newKeyId = `key_${Date.now()}`
    const newKey: ApiKey = {
      id: newKeyId,
      name: newKeyId,
      status: "Live",
      created: new Date().toLocaleDateString(),
      used: 0,
    }
    const updated = [...apiKeys, newKey]
    setApiKeys(updated)
    localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(updated))
    toast.success("API key created", { position: "top-center" })
  }

  const deleteApiKey = (id: string) => {
    const updated = apiKeys.filter(key => key.id !== id)
    setApiKeys(updated)
    localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(updated))
    toast.success("API key deleted", { position: "top-center" })
  }

  const updateVariable = (index: number, updates: Partial<Variable>) => {
    const updated = [...config.variables]
    updated[index] = { ...updated[index], ...updates }
    setConfig({ ...config, variables: updated })
  }

  const deleteVariable = (index: number) => {
    const updated = config.variables.filter((_, i) => i !== index)
    setConfig({ ...config, variables: updated })
  }

  const addVariable = () => {
    const newVariable: Variable = {
      name: "New Variable",
      type: "dropdown",
      values: [],
    }
    setConfig({ ...config, variables: [...config.variables, newVariable] })
  }

  const openEditDialog = (index: number) => {
    setSelectedVariable(config.variables[index])
    setEditingIndex(index)
    setEditDialogOpen(true)
  }

  const handleSaveVariable = (updatedVariable: Variable) => {
    if (editingIndex !== null) {
      updateVariable(editingIndex, updatedVariable)
      toast.success("Variable updated", { position: "top-center" })
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Configure variables and formatting options for the file name generator</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted">
            {config.locked ? <Lock className="h-4 w-4" /> : <div className="h-4 w-4" />}
            <span className="text-sm">{config.locked ? "Locked" : "Unlocked"}</span>
          </div>
        </div>

        {/* Variables Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Variables</CardTitle>
            </div>
            <Button onClick={addVariable} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Variable
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {config.variables.length === 0 ? (
              <p className="text-sm text-muted-foreground">No variables configured yet</p>
            ) : (
              config.variables.map((variable, idx) => (
                <div key={idx} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold">{variable.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Type: {variable.type} • {variable.values.length} value{variable.values.length !== 1 ? "s" : ""}
                      </p>
                      {variable.description && (
                        <p className="text-sm text-muted-foreground">{variable.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEditDialog(idx)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => deleteVariable(idx)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {variable.values.slice(0, 3).map((val, vidx) => (
                      <span key={vidx} className="text-xs bg-muted px-2 py-1 rounded">
                        {val}
                      </span>
                    ))}
                    {variable.values.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{variable.values.length - 3} more</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Formatting Options */}
        <Card>
          <CardHeader>
            <CardTitle>Formatting Options</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="case-transform">Case Transformation</Label>
              <Select value={config.caseTransformation} onValueChange={(value: any) => setConfig({ ...config, caseTransformation: value })}>
                <SelectTrigger id="case-transform">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lowercase">Lowercase</SelectItem>
                  <SelectItem value="uppercase">Uppercase</SelectItem>
                  <SelectItem value="unchanged">Unchanged</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">How to transform the case of variable values in the file name</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="separator">Separator Character</Label>
              <Input
                id="separator"
                value={config.separatorCharacter}
                onChange={(e) => setConfig({ ...config, separatorCharacter: e.target.value })}
                maxLength={1}
                placeholder="_"
              />
              <p className="text-xs text-muted-foreground">Character used to separate words in the file name</p>
            </div>
          </CardContent>
        </Card>

        {/* Export/Import and Delete */}
        <div className="flex gap-2 flex-wrap justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportConfig} size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={importConfig} size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
          </div>
          <Button variant="destructive" onClick={deleteConfiguration} size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Configuration
          </Button>
        </div>

        {/* API Keys Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API keys for accessing the AdTax API</CardDescription>
            </div>
            <Button onClick={createApiKey} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create API Key
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {apiKeys.length === 0 ? (
              <p className="text-sm text-muted-foreground">No API keys created yet</p>
            ) : (
              apiKeys.map((key) => (
                <div key={key.id} className="border rounded-lg p-4 flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-mono text-sm">{key.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${key.status === "Live" ? "bg-green-500/20 text-green-700 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
                        {key.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Created: {key.created} • Used {key.used} times</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => deleteApiKey(key.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={saveConfig} size="lg">
            Save Configuration
          </Button>
        </div>
      </div>

      {/* Edit Variable Dialog */}
      <EditVariableDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        variable={selectedVariable}
        onSave={handleSaveVariable}
      />
    </div>
  )
}
