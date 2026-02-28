"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

function parseValue(val: string): { num: number; suffix: string; prefix: string } {
  const match = val.match(/^([+]?)([0-9.,]+)([kKmM+]*)/);
  if (!match) return { num: 0, suffix: val, prefix: "" };
  const num = parseFloat(match[2].replace(/\./g, "").replace(",", "."));
  return {
    prefix: match[1],
    num,
    suffix: match[3] || "",
  };
}

export function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState("0");
  const parsed = parseValue(value);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200;
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(parsed.num * eased);

      if (parsed.num >= 1000) {
        setDisplayValue(current.toLocaleString("pt-BR"));
      } else if (parsed.num % 1 !== 0) {
        setDisplayValue((parsed.num * eased).toFixed(2));
      } else {
        setDisplayValue(String(current));
      }

      if (step >= steps) {
        clearInterval(timer);
        // Set final exact value
        if (parsed.num >= 1000) {
          setDisplayValue(parsed.num.toLocaleString("pt-BR"));
        } else if (parsed.num % 1 !== 0) {
          setDisplayValue(parsed.num.toFixed(2));
        } else {
          setDisplayValue(String(parsed.num));
        }
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, parsed.num]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {parsed.prefix}{displayValue}{parsed.suffix}
    </motion.span>
  );
}
