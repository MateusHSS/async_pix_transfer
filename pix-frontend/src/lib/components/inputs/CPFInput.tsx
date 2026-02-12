import { Controller, type Control } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";
import { formatarCPF } from "../../cpfValidator";

interface CPFInputProps extends Omit<TextFieldProps, "name"> {
    name: string;
    control: Control<any>;
    label?: string;
}

export function CPFInput({ name, control, label = "CPF", ...rest }: CPFInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    {...rest}
                    label={label}
                    onChange={(e) => {
                        const formatted = formatarCPF((e.target.value ?? "").toString());
                        field.onChange(formatted);
                    }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? rest.helperText}
                    inputProps={{ maxLength: 14, inputMode: "numeric", ...(rest.inputProps ?? {}) }}
                    fullWidth
                />
            )}
        />
    );
}
