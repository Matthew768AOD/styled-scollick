import React, { useState } from "react";
import styled from "styled-components";

type Size = "sm" | "lg";

export type OptionButtonProps = {
  label: string;
  size?: Size;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
};

const sizes = {
  sm: { h: 32, px: 14, radius: 12, font: 14, shadowBlur: 10 },
  lg: { h: 64, px: 22, radius: 18, font: 28, shadowBlur: 16 },
};

const OptionRoot = styled.button<{ $checked: boolean; $size: Size; }>`
  ${({ $size }) => {
    const s = sizes[$size];
    return `
      height: ${s.h}px;
      padding: 0 ${s.px}px;
      border-radius: ${s.radius}px;
      font-size: ${s.font}px;
    `;
  }}

  border: none;
  outline: none;
  cursor: pointer;
  user-select: none;
  line-height: 1;

  background: ${({ theme, $checked }) => $checked ? (theme as any).colors.grey : (theme as any).colors.magnolia};
  color: ${({ theme, $checked }) => $checked ? (theme as any).colors.magnolia : (theme as any).colors.grey};

  box-shadow:
    5px 5px 7px rgba(0,0,0,0.25),
    -2px -2px 4px rgba(255,255,255,0.18);

  transition: background-color 150ms ease, color 150ms ease, transform 80ms ease;

  &:hover:not(:disabled) {
    &:hover:not(:disabled) {
      background: ${({ theme, $checked }) => $checked ? (theme as any).colors.magnolia : (theme as any).colors.grey};
      color: ${({ theme, $checked }) => $checked ? (theme as any).colors.grey : (theme as any).colors.magnolia};
    }
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const OptionButton: React.FC<OptionButtonProps> = ({
  label,
  size = "sm",
  checked,
  defaultChecked = false,
  onChange,
  disabled,
  className,
}) => {
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isOn = isControlled ? !!checked : internal;

  const toggle = () => {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <OptionRoot
      type="button"
      className={className}
      $checked={isOn}
      $size={size}
      onClick={toggle}
      disabled={disabled}
      aria-pressed={isOn}
      title={label}
    >
      {label}
    </OptionRoot>
  );
};
