import { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function ButtonSuper({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  className,
}: ButtonProps) {
  const baseStyles =
    "px-5 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-indigo-500 text-white hover:bg-indigo-700 hover:scale-105 shadow-md hover:shadow-lg",
    secondary:
      "bg-emerald-500 text-white hover:bg-emerald-700 hover:-translate-y-1 shadow hover:shadow-xl",
    danger:
      "bg-red-500 text-white hover:bg-red-700 hover:shadow-[0_0_15px_rgba(239,68,68,0.7)]",
    outline:
      "bg-white border border-gray-400 text-gray-700 hover:bg-gray-100 hover:border-black",
    ghost:
      "bg-transparent text-indigo-600 hover:text-indigo-800 relative group",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variants[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
      {/* efeito underline só no ghost */}
      {variant === "ghost" && (
        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
      )}
    </button>
  );
}
