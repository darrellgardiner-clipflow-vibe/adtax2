"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"about" | "example">("about")

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Meta Ad File Name Generator</h1>
          <p className="text-muted-foreground">A tool for standardising how advertising creative files are named and organised across campaigns.</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === "about" ? "default" : "outline"}
            onClick={() => setActiveTab("about")}
            className="flex-1"
          >
            About
          </Button>
          <Button
            variant={activeTab === "example" ? "default" : "outline"}
            onClick={() => setActiveTab("example")}
            className="flex-1"
          >
            Example
          </Button>
        </div>

        {/* About Tab */}
        {activeTab === "about" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  This tool generates structured file names for ad creative assets used in Meta ads, YouTube ads, Google Display, TikTok and other advertising platforms. It is intended for teams who want to label their creative exports so they can be searched, referenced, compared and reported on without manual guesswork.
                </p>
                <p>
                  Naming conventions are often treated as a minor detail, but they shape how quickly teams can work and how easily they can understand what has already been created. When naming is inconsistent, libraries become difficult to navigate, duplicate work increases and creative testing data becomes harder to interpret. A clear naming structure removes that friction.
                </p>
                <p>
                  This tool provides a simple system for defining variables, selecting values and generating file names that follow a shared format.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  You configure a set of variables that matter to your workflow. Common variables include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Format (for example: 16×9, 9×16, 1×1)</li>
                  <li>Funnel stage (for example: cold, warm, retargeting)</li>
                  <li>Persona or audience segment</li>
                  <li>Creative archetype or concept</li>
                  <li>Campaign objective or offer</li>
                </ul>
                <p className="mt-4">
                  You can define each variable as a dropdown list, a multi-select field or a free text input. You can also specify the separator character and whether names should be uppercase, lowercase or unchanged.
                </p>
                <p>
                  Once configured, you select values in the Generator view and the tool outputs a file name that matches the structure you defined. This means you do not need to remember naming rules or check other files to stay consistent.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why This Exists</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  Most advertising teams store thousands of creative files across shared drives, project folders and version histories. Without a consistent naming convention, it becomes difficult to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Identify which creative belongs to which campaign</li>
                  <li>Understand the purpose or testing intent behind a variation</li>
                  <li>Locate past assets for reuse or comparison</li>
                  <li>Track the performance of specific creative types over time</li>
                </ul>
                <p className="mt-4">
                  A structured naming system turns the asset library into something you can query and reason about. It allows for cleaner reporting and more reliable testing because creative variations become easier to compare.
                </p>
                <p>
                  This tool exists to reduce ambiguity and to make organisation an intentional part of the creative process rather than something fixed after the fact.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Customisable variable definitions</li>
                  <li>Dropdown, multi-select and free-text field types</li>
                  <li>Custom separator characters</li>
                  <li>Case formatting options</li>
                  <li>Descriptions for variable meaning and usage</li>
                  <li>Optional configuration lock for shared standards</li>
                  <li>File name history for reference and reuse</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intended Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  This tool is for internal workflow organisation. It is not designed as a commercial consumer product. It is meant for teams who are already producing and testing creative regularly and want to maintain clarity as volume increases.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suggested Practice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Agree on naming conventions early.</li>
                  <li>Document the meaning of each variable.</li>
                  <li>Stick to the structure even when deadlines are tight.</li>
                </ul>
                <p className="mt-4">
                  Future you (and your team) will be able to find things faster and understand past decisions more accurately.
                </p>
              </CardContent>
            </Card>

            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader className="flex flex-row items-start gap-4">
                <AlertCircle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                <div>
                  <CardTitle className="text-destructive">Important Disclaimer</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  <strong>It's not safe for use for any actual business. Proceed at your own risk.</strong>
                </p>
                <p>
                  This tool is provided as-is for convenience and educational purposes only. It should not be relied upon
                  for production use in actual business operations. Use at your own discretion and risk.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Example Tab */}
        {activeTab === "example" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Example Naming Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted rounded-md font-mono text-sm">
                  16x9_creator_cold_demo_curiosity_free_trial_v1
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Breakdown of Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2 font-semibold">Component</th>
                        <th className="text-left py-2 px-2 font-semibold">Example</th>
                        <th className="text-left py-2 px-2 font-semibold">Meaning</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">Size</td>
                        <td className="py-3 px-2 font-mono">16x9</td>
                        <td className="py-3 px-2 text-muted-foreground">The aspect ratio or placement format. Helps identify where the creative is intended to run (for example feed vs stories vs reels).</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">Persona</td>
                        <td className="py-3 px-2 font-mono">creator</td>
                        <td className="py-3 px-2 text-muted-foreground">The audience or segment the creative is written for. Useful when teams run variations of the same idea for different audiences.</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">Funnel Stage</td>
                        <td className="py-3 px-2 font-mono">cold</td>
                        <td className="py-3 px-2 text-muted-foreground">Indicates where the ad sits in the customer journey. Helps when reviewing testing performance and avoiding mismatched messaging.</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">Archetype</td>
                        <td className="py-3 px-2 font-mono">demo</td>
                        <td className="py-3 px-2 text-muted-foreground">The conceptual structure of the creative (for example demo, story, proof, claim). Used for pattern recognition when analysing what type of creative works.</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">Hook</td>
                        <td className="py-3 px-2 font-mono">curiosity</td>
                        <td className="py-3 px-2 text-muted-foreground">The primary psychological angle of the headline or intro. Allows classification of creative intent.</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">CTA / Offer</td>
                        <td className="py-3 px-2 font-mono">free_trial</td>
                        <td className="py-3 px-2 text-muted-foreground">The action or value presented. Useful when comparing performance across offer tests.</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="py-3 px-2">Variation</td>
                        <td className="py-3 px-2 font-mono">v1</td>
                        <td className="py-3 px-2 text-muted-foreground">A simple incrementing version so you can create multiple iterations without renaming the whole structure.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Another Multi-Format Example</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted rounded-md font-mono text-sm break-all">
                  1x1,4x5,9x16_creator_hot_feature_proof_kinso_story_test_demo_light_v3
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2 font-semibold">Component</th>
                        <th className="text-left py-2 px-2 font-semibold">Example</th>
                        <th className="text-left py-2 px-2 font-semibold">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">Size</td>
                        <td className="py-3 px-2 font-mono">1x1,4x5,9x16</td>
                        <td className="py-3 px-2 text-muted-foreground">Multiple aspect ratios exported together as a batch. This helps track a concept across placements.</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">Persona</td>
                        <td className="py-3 px-2 font-mono">creator</td>
                        <td className="py-3 px-2 text-muted-foreground">Same meaning as above.</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">Funnel Stage</td>
                        <td className="py-3 px-2 font-mono">hot</td>
                        <td className="py-3 px-2 text-muted-foreground">Retargeting or engaged audiences.</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">Creative Pattern</td>
                        <td className="py-3 px-2 font-mono">feature_proof</td>
                        <td className="py-3 px-2 text-muted-foreground">A combination archetype that pairs product features with a credibility element.</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">Hook or Theme</td>
                        <td className="py-3 px-2 font-mono">kinso_story_test_demo</td>
                        <td className="py-3 px-2 text-muted-foreground">Internal shorthand. Teams often develop named internal hooks or references to previous tests.</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">Tone / Style</td>
                        <td className="py-3 px-2 font-mono">light</td>
                        <td className="py-3 px-2 text-muted-foreground">Optional. Can represent editing style, pace, visual tone or production approach.</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="py-3 px-2">Version</td>
                        <td className="py-3 px-2 font-mono">v3</td>
                        <td className="py-3 px-2 text-muted-foreground">Indicates iteration history.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>The Point of the Naming Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  The purpose of storing this metadata in the file name is to make browsing, filtering and comparing creative faster and repeatable. The name itself acts as the first level of classification, which removes the need to rely on memory or platform-specific naming.
                </p>
                <p>
                  It becomes much easier to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Sort and filter creative exports in a folder</li>
                  <li>Compare performance across archetypes or hooks</li>
                  <li>Revisit past experiments when planning future tests</li>
                  <li>Onboard new team members into the creative system</li>
                </ul>
                <p className="mt-4">
                  The naming structure is not about increasing complexity. It is about storing useful context at the point of creation so it does not need to be reconstructed later.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
