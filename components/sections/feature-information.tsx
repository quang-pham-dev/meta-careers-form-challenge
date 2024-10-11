import { FeatureDescription } from '@/components/sections/feature-description'
import { AnimatedFadeUp } from '@/components/animated-fade-up'
import { FEATURES_INFORMATION } from '@/constants'

export function FeatureInformation() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Sign up for Career Profile</h1>
      <p className="text-lg mb-6">
        Create a Career Profile to keep track of your applications, prepare for
        the interview process and more.
      </p>
      <AnimatedFadeUp delay={0.1} duration={0.5}>
        <p className="text-lg text-gray-600 mb-2">Additional Features</p>
        <div className="w-36 h-0.5 bg-gray-300 mb-4"></div>
      </AnimatedFadeUp>

      <div className="space-y-4">
        {FEATURES_INFORMATION.map(feature => {
          const { title, description, animationConfig } = feature
          return (
            <AnimatedFadeUp key={title} {...animationConfig}>
              <FeatureDescription title={title} description={description} />
            </AnimatedFadeUp>
          )
        })}
      </div>
    </>
  )
}
