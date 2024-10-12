import { useFormStatus } from 'react-dom'
import { motion } from 'framer-motion'
import { Button } from './button'

export function SubmitButton({ isPending }: { isPending?: boolean }) {
  const { pending } = useFormStatus()

  return (
    <motion.div
      initial={{ y: 20, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: 'spring', ease: 'easeOut' }}>
      <Button
        type="submit"
        disabled={pending || isPending}
        className="w-full bg-blue-500 hover:bg-blue-600">
        {pending || isPending ? 'Submitting...' : 'Create Career Profile'}
      </Button>
    </motion.div>
  )
}
