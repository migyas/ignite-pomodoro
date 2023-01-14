import { ButtonContainer, VariantColor } from "./Button.styles";

interface ButtonProps {
  variant?: VariantColor;
}

export function Button({ variant = "primary" }: ButtonProps) {
  return <ButtonContainer variant={variant}>Hope</ButtonContainer>;
}
