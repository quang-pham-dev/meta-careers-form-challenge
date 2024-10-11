import { CheckCircle2, XCircle } from 'lucide-react'

interface PasswordStrengthIndicatorProps {
  label: string
  met: boolean
}

export function PasswordStrengthIndicator({
  label,
  met,
}: PasswordStrengthIndicatorProps) {
  return (
    <div
      className={`flex items-center ${met ? 'text-green-500' : 'text-red-500'}`}>
      {met ? (
        <CheckCircle2 className="h-4 w-4 mr-2" aria-label="Check" />
      ) : (
        <XCircle className="h-4 w-4 mr-2" aria-label="X" />
      )}
      <span className="text-sm">{label}</span>
    </div>
  )
}
