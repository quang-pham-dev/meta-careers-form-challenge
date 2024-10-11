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
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
