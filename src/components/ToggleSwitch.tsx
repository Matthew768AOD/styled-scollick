import React, { useState, useId } from "react";
import styled, { useTheme } from "styled-components";

type ToggleProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
};

const Track = styled.button<{ $border: string; $ring: string; $checked: boolean }>`
  position: relative;
  width: 80px;
  height: 40px;
  border-radius: 9999px;
  background: transparent;

  border: 3px solid ${props => props.$border};
  box-shadow:
    0 0 0 3px ${props => props.$ring},
    6px 6px 12px rgba(0, 0, 0, 0.35),
    -3px -3px 6px rgba(255, 255, 255, 0.28),
    inset 2px 2px 4px rgba(0, 0, 0, 0.18),
    inset -2px -2px 4px rgba(255, 255, 255, 0.18);

  display: inline-flex;
  align-items: center;
  cursor: pointer;
  outline: none;

  &:disabled { cursor: not-allowed; opacity: .7; }
  &:hover { border-color: ${props => props.$ring}; }
`;

const Knob = styled.span<{ $checked: boolean; $border: string; $ring: string }>`
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translate(${({ $checked }) => ($checked ? "40px" : "0")}, -50%);
  width: 31px;
  height: 31px;
  border-radius: 50%;
  background: ${props => props.$border};
  transition:
    transform 220ms cubic-bezier(.2,.8,.2,1),
    background-color 150ms ease;

  box-shadow:
    5px 5px 7px rgba(0,0,0,0.25),
    -2px -2px 4px rgba(255,255,255,0.15);

  ${Track}:hover & {
    background: ${props => props.$ring};
  }
`;

export const ToggleSwitch: React.FC<ToggleProps> = ({
  checked,
  defaultChecked = false,
  onChange,
  disabled,
  className,
  id,
}) => {
  const theme: any = useTheme();
  const isDark = theme.mode === "dark";

  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked! : internal;

  const borderColor = isDark ? theme.colors.magnolia : theme.colors.grey;
  const ringColor = theme.colors.periwinkle;

  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const htmlId = id ?? useId();

  return (
    <Track
      id={htmlId}
      role="switch"
      aria-checked={on}
      aria-disabled={disabled}
      $border={borderColor}
      $ring={ringColor}
      $checked={on}
      disabled={disabled}
      className={className}
      onClick={toggle}
      title={on ? "On" : "Off"}
    >
      <Knob $checked={on} $border={borderColor} $ring={ringColor} />
    </Track>
  );
};
