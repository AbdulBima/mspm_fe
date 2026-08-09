import { Sparkles } from "lucide-react";
import { AI_GRADIENT, AI_GRADIENT_SHADOW } from "@/lib/gradients";

interface AIAvatarProps {
  size: number;
  iconSize: number;
  rounded?: string;
  glow?: boolean;
}


export function AIAvatar({ size, iconSize, rounded = "rounded-full", glow = false }: AIAvatarProps) {
  return (
    <div className="relative flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      {glow && <div className={`absolute inset-0 ${rounded} opacity-30 blur-lg`} style={{ background: AI_GRADIENT }} />}
      <div
        className={`relative flex items-center justify-center ${rounded}`}
        style={{ width: size, height: size, background: AI_GRADIENT, boxShadow: AI_GRADIENT_SHADOW }}
      >
        <Sparkles size={iconSize} color="#FFFFFF" />
      </div>
    </div>
  );
}