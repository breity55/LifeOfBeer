import React from "react";
import { Button } from "react-bootstrap";

export default ({
    isLoading,
    text,
    loadingText,
    className = "",
    variant = "primary",
    disabled = false,
    ...props
}) =>
    <Button className={`loader-button ${className}`} variant={variant} disabled={disabled || isLoading} {...props}>
        {isLoading}
        {!isLoading ? text : loadingText}
    </Button>;
