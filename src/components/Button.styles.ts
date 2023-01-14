import styled from "styled-components";

export type VariantColor = "primary" | "secondary" | "danger" | "success";

interface ButtonContainerProps {
  variant: VariantColor;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  background-color: ${(props) => props.theme.primary};
`;
