import { motion, AnimatePresence } from 'framer-motion'

interface AnimationWrapperProps {
  initial?: Record<string, number>
  animate?: Record<string, number>
  transtion?: Record<string, number>
  children: React.ReactNode
  className?: string
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transtion = { duration: 1 },
  children,
  className,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transtion}
        className={className}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
export default AnimationWrapper
