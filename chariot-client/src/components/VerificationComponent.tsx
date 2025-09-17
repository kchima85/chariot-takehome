import type { FC } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { CheckCircle, Palette, Settings } from 'lucide-react'

const VerificationComponent: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-foreground mb-4 text-4xl font-bold">
          🎨 Theme & Component Verification
        </h1>
        <p className="text-muted-foreground text-lg">
          Testing shadcn/ui components with custom theme colors
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Primary Theme Card */}
        <Card className="relative overflow-hidden border-blue-200">
          <CardHeader className="bg-blue-50">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-blue-800">Primary Theme</CardTitle>
            </div>
            <CardDescription className="text-blue-600">
              Main brand colors using blue palette
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Primary Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                Background:{' '}
                <span className="font-mono text-blue-600">bg-primary</span>
              </p>
              <p className="text-muted-foreground text-sm">
                Text:{' '}
                <span className="font-mono text-blue-600">
                  text-primary-foreground
                </span>
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Primary Button</Button>
          </CardFooter>
        </Card>

        {/* Secondary Theme Card */}
        <Card className="border-emerald-200">
          <CardHeader className="bg-emerald-50">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-emerald-600" />
              <CardTitle className="text-emerald-800">
                Secondary Theme
              </CardTitle>
            </div>
            <CardDescription className="text-emerald-600">
              Secondary colors using emerald palette
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Secondary Badge</Badge>
              <div className="rounded bg-emerald-500 px-3 py-1 text-xs font-medium text-white">
                Custom Emerald
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                This uses the emerald color palette
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">
              Secondary Button
            </Button>
          </CardFooter>
        </Card>

        {/* Accent Theme Card */}
        <Card className="border-violet-200">
          <CardHeader className="bg-violet-50">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-violet-600" />
              <CardTitle className="text-violet-800">Accent Theme</CardTitle>
            </div>
            <CardDescription className="text-violet-600">
              Accent colors using violet palette
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <div className="rounded bg-violet-500 px-3 py-1 text-xs font-medium text-white">
                Violet 500
              </div>
              <div className="rounded border border-violet-300 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                Violet Light
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                Custom violet accent colors are working!
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-violet-500 text-white hover:bg-violet-600">
              Accent Button
            </Button>
          </CardFooter>
        </Card>

        {/* Warning Theme Card */}
        <Card className="border-amber-200">
          <CardHeader className="bg-amber-50">
            <CardTitle className="text-amber-800">Warning Theme</CardTitle>
            <CardDescription className="text-amber-600">
              Warning colors using amber palette
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <div className="rounded bg-amber-500 px-3 py-1 text-xs font-medium text-white">
                Amber Warning
              </div>
              <div className="rounded border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                Warning Light
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-amber-500 text-white hover:bg-amber-600">
              Warning Button
            </Button>
          </CardFooter>
        </Card>

        {/* Danger Theme Card */}
        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-800">Danger Theme</CardTitle>
            <CardDescription className="text-red-600">
              Danger colors using red palette
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="destructive">Destructive Badge</Badge>
              <div className="rounded bg-red-500 px-3 py-1 text-xs font-medium text-white">
                Custom Red
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" className="w-full">
              Destructive Button
            </Button>
          </CardFooter>
        </Card>

        {/* shadcn/ui Default System */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>shadcn/ui System</CardTitle>
            <CardDescription>Default shadcn/ui theming system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-background rounded border p-2">
                <span className="font-mono">background</span>
              </div>
              <div className="bg-muted rounded p-2">
                <span className="font-mono">muted</span>
              </div>
              <div className="bg-card rounded border p-2">
                <span className="font-mono">card</span>
              </div>
              <div className="bg-popover rounded border p-2">
                <span className="font-mono">popover</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" className="flex-1">
              Outline
            </Button>
            <Button variant="ghost" className="flex-1">
              Ghost
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-muted mt-8 rounded-lg p-6">
        <h3 className="mb-4 text-lg font-semibold">✅ What This Tests:</h3>
        <div className="grid gap-2 md:grid-cols-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">
              Custom theme colors (primary, secondary, accent, warning, danger)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">shadcn/ui component integration</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">CSS custom properties system</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">Tailwind CSS v4 compatibility</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationComponent
