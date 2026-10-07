import clsx from "clsx";
import { buttonBase, buttonVariants } from "./buttonStyles";

const Button = ({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      {...props}
      className={clsx(
        buttonBase,
        buttonVariants[variant] || buttonVariants.primary,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
