'use client'

import { Axis3D, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes'

export default function ReverseToggle() {
  const { theme, setTheme } = useTheme()

  const toggleReverse = () => {
    setTheme(theme === "normal" ? "reverse" : "normal");
  };
  return (
    <>
      <Axis3D onClick={toggleReverse} style={{ marginLeft: "10px" }}>
        Сменить на reverse тему
      </Axis3D>
    </>
  )
}
