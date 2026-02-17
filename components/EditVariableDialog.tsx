"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface Variable {
  name: string
  type: "dropdown" | "multiselect" | "text"
  values: string[]
  description?: string
  allowFreeInput?: boolean
}

interface EditVariableDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  variable: Variable | null
  onSave: (variable: Variable) => void
}

export function EditVariableDialog({
  open,
  onOpenChange,
  variable,
  onSave,
}: EditVariableDialogProps) {
  const [label, setLabel] = useState(variable?.name || "")
  const [type, setType] = useState<"dropdown" | "multiselect" | "text">(variable?.type || "dropdown")
  const [values, setValues] = useState(variable?.values.join(", ") || "")
  const [allowFreeInput, setAllowFreeInput] = useState(variable?.allowFreeInput || false)

  const handleSave = () => {
    if (!label.trim()) return

    const variableValues = values
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v.length > 0)

    onSave({
      name: label,
      type,
      values: variableValues,
      allowFreeInput,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Variable</DialogTitle>
          <DialogDescription>Update variable configuration</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Variable name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(value: any) => setType(value)}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dropdown">Dropdown</SelectItem>
                <SelectItem value="multiselect">Multiselect</SelectItem>
                <SelectItem value="text">Text</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="values">Values (comma-separated)</Label>
            <textarea
              id="values"
              value={values}
              onChange={(e) => setValues(e.target.value)}
              placeholder="Enter values separated by commas"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">Enter values separated by commas</p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="allowFreeInput"
              checked={allowFreeInput}
              onCheckedChange={(checked) => setAllowFreeInput(checked as boolean)}
            />
            <Label htmlFor="allowFreeInput" className="cursor-pointer">
              Allow free input
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Variable
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
