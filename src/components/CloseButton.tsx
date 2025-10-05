import styled, { useTheme } from "styled-components";

export type MovementButtonProps = {
  direction?: "forward" | "back";
  onClick?: () => void;
};

const ButtonWithRing = styled.button<{ $border: string; $ring: string }>`
  position: relative;
  z-index: 1;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 3px solid ${props => props.$border};
  cursor: pointer;

  outline: none;

  box-shadow:
    0 0 0 3px ${props => props.$ring},
    5px 5px 7px rgba(0, 0, 0, 0.53),
    -3px -3px 6px rgba(255, 255, 255, 0.53);

  &:focus,
  &:focus-visible {
    outline: none;
  }

  &:hover {
    border-color: ${props => props.$ring};
    svg {
      stroke: ${props => props.$ring};
    }
  }
`;
const XIcon = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke={color}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 6l12 12M6 18L18 6" />
  </svg>
);

export const CloseButton = ({ onClick, }: { onClick?: () => void; }) => {
  const theme: any = useTheme();
  const isDark = theme.colors.background === "#202020" || theme.colors.text === "#ffffffff";
  const borderColor = isDark ? theme.colors.magnolia : theme.colors.grey;
  const ringColor = theme.colors.periwinkle;

  return (
    <ButtonWithRing
      $border={borderColor}
      $ring={ringColor}
      title="Close"
      onClick={onClick ?? (() => console.log("Close button clicked"))}
    >
      <XIcon color={borderColor} />
    </ButtonWithRing>
  );
};
