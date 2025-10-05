import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { OptionButton } from "./OptionButton";

type Size = "sm" | "lg";
type Item = { label: string; value: string };

type Props = {
  options: Item[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: Size;
  className?: string;
};

const Group = styled.div<{ $border: string; $ring: string }>`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 20px;
  background: transparent;

  border: 3px solid ${props => props.$border};
  box-shadow:
    0 0 0 3px ${props => props.$ring},
    5px 5px 7px rgba(0, 0, 0, 0.25),
    -2px -2px 4px rgba(255, 255, 255, 0.15);
`;

export const OptionGroup: React.FC<Props> = ({
  options,
  value,
  defaultValue,
  onChange,
  size = "sm",
  className,
}) => {
  const theme: any = useTheme();
  const isDark = theme.mode === "dark";
  const borderColor = isDark ? theme.colors.magnolia : theme.colors.grey;
  const ringColor = theme.colors.periwinkle;

  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value);
  const selected = value ?? internal;

  const select = (val: string) => {
    if (value === undefined) setInternal(val);
    onChange?.(val);
  };

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const effectiveSize = windowWidth < 450 ? "sm" : size;

  return (
    <Group
      role="radiogroup"
      aria-label="options"
      className={className}
      $border={borderColor}
      $ring={ringColor}
    >
      {options.map((o) => (
        <OptionButton
          key={o.value}
          label={o.label}
          size={effectiveSize}
          checked={selected === o.value}
          onChange={() => select(o.value)}
        />
      ))}
    </Group>
  );
};
