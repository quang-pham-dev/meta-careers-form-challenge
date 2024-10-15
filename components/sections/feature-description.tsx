interface FeatureDescriptionProps {
  title: string
  description: string
}

export function FeatureDescription({
  title,
  description,
}: FeatureDescriptionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
