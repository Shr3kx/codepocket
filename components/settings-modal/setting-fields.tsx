"use client";

import * as React from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SELECT_INPUT_WIDTH } from "./constants";

interface SettingFieldProps {
  label: string;
  description: string;
  children: React.ReactNode;
  showSeparator?: boolean;
}

export function SettingField({
  label,
  description,
  children,
  showSeparator = true,
}: SettingFieldProps) {
  return (
    <>
      <Field orientation="horizontal" className="items-start">
        <div className="flex-1 space-y-1 min-w-0">
          <FieldLabel>{label}</FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </div>
        <div className="flex-shrink-0">{children}</div>
      </Field>
      {showSeparator && <Separator className="bg-border/40" />}
    </>
  );
}

interface SelectFieldOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  value: string;
  onValueChange: (value: string) => void;
  options: readonly Readonly<SelectFieldOption>[];
  className?: string;
}

export function SelectField({
  value,
  onValueChange,
  options,
  className,
}: SelectFieldProps) {
  const handleValueChange = (newValue: string | null, _eventDetails?: unknown) => {
    if (newValue !== null) {
      onValueChange(newValue);
    }
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className={className || SELECT_INPUT_WIDTH}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent side="bottom" position="popper">
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface BooleanToggleFieldProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  className?: string;
}

export function BooleanToggleField({
  value,
  onValueChange,
  className,
}: BooleanToggleFieldProps) {
  return (
    <SelectField
      value={value ? "on" : "off"}
      onValueChange={val => onValueChange(val === "on")}
      options={[
        { value: "on", label: "On" },
        { value: "off", label: "Off" },
      ]}
      className={className}
    />
  );
}

interface NumberInputFieldProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function NumberInputField({
  value,
  onChange,
  min,
  max,
  className,
}: NumberInputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(e.target.value, 10);
    onChange(isNaN(numValue) ? 0 : numValue);
  };

  return (
    <Input
      type="number"
      value={value}
      onChange={handleChange}
      min={min?.toString()}
      max={max?.toString()}
      className={className || SELECT_INPUT_WIDTH}
    />
  );
}
