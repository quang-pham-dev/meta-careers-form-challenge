import { FeatureInformation } from '@/components/sections'
import { SignUpForm } from '@/components/forms'

export default function Home() {
  return (
    <div suppressHydrationWarning className="flex-grow p-4 sm:p-6 md:p-8">
      <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-pink-50">
        <div className="m-auto w-full max-w-6xl p-6 flex">
          <div className="flex-1 pr-16 mt-4">
            <FeatureInformation />
          </div>
          <div className="flex-1">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  )
}
