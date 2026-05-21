'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  onClick?: () => void;
  delay?: number;
}

export default function Card({
  children,
  className,
  glow,
  hover,
  onClick,
  delay = 0,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={clsx(
        'glass rounded-2xl p-5',
        glow && 'glow-accent',
        hover && 'cursor-pointer glass-hover transition-all duration-200',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
