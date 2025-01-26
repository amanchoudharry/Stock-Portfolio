import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

export default function Hero() {
  return (
    <Card className="bg-gray-800 border-0 shadow-none p-6 mb-8">
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text mb-2">
            Portfolio Tracker
          </h1>
          <p className="text-gray-400 text-md">Track your investments and monitor your portfolio performance</p>
        </div>
      </div>
    </Card>
  )
}

