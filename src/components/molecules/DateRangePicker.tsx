// src/components/molecules/DateRangePicker.tsx
// Molecule component — combines two Input atoms with validation
// "To" date cannot be earlier than "From" date

import React from "react";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { DateRange } from "@/types/sales";
import { X } from "lucide-react";

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  minDate?: string;  // ISO YYYY-MM-DD
  maxDate?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  minDate = "2022-01-01",
  maxDate = "2024-12-31",
}) => {
  const handleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const from = e.target.value || null;
    // If "to" is before new "from", clear "to"
    const to = value.to && from && value.to < from ? null : value.to;
    onChange({ from, to });
  };

  const handleTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, to: e.target.value || null });
  };

  const handleClear = () => onChange({ from: null, to: null });

  return (
    <div className="flex flex-wrap items-end gap-3">
      <Input
        id="date-from"
        label="From"
        type="date"
        value={value.from ?? ""}
        min={minDate}
        max={maxDate}
        onChange={handleFrom}
        className="w-40"
      />
      <Input
        id="date-to"
        label="To"
        type="date"
        value={value.to ?? ""}
        min={value.from ?? minDate}
        max={maxDate}
        onChange={handleTo}
        disabled={!value.from}
        className="w-40"
      />
      {(value.from || value.to) && (
        <Button variant="ghost" size="sm" onClick={handleClear} aria-label="Clear date range">
          <X size={14} /> Clear
        </Button>
      )}
    </div>
  );
};
