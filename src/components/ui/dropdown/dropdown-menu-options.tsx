"use client"

import { ChevronDown, ChevronUp } from 'lucide-react';
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu-exports";
import { InfoTooltip } from '@/components/ui/tooltip/info-tooltip';

interface DropdownMenuOptionsProps {
  name: string;
  label: string;
  placeholder?: string;
  options: string[];
  onSelect: (option: string) => void;
  selected?: string | null;
  required?: boolean;
  additionalInfo?: string;
  errorMessage?: string;
}

export function DropdownMenuOptions({ name, label, placeholder, options, selected, required, additionalInfo, errorMessage }: DropdownMenuOptionsProps ) {
  const [currentSelected, setCurrentSelected] = React.useState<string | null>(selected || '');
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleSelect = (option: string) => {
    setCurrentSelected(option);
  }

  const displayText = currentSelected || placeholder || null;
  const textColor = currentSelected ? 'text-slate-900' : errorMessage ? 'text-red-500' : 'text-slate-400';

  return (
    <label htmlFor={name} className='flex flex-col gap-1.5'>
      <div className='flex flex-row gap-1'>
        <span className='text-slate-900 text-sm'>{label}</span>
        {required && <span className='text-red-500 text-sm'>*</span>}
        {additionalInfo && <InfoTooltip text={additionalInfo}></InfoTooltip>}
      </div>
      <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger asChild>
          <button className={`dropdown-button flex flex-row gap-2.5 justify-between items-center rounded-md border border-solid text-base py-2 px-3 w-52 ${errorMessage ? "border border-red-500" : "border-slate-300"}`}>
            <span className={`text-sm ${textColor}`}>
              {displayText}
            </span>
            {isOpen ? (
              <ChevronUp className='text-slate-400' size={16} />
            ) : (
              <ChevronDown className='text-slate-400' size={16} />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52 py-1.5 px-2">
          {options.map(option => (
            <DropdownMenuItem 
              className='py-1.5 px-2 text-slate-700 text-sm hover:bg-slate-100 rounded-b-md'
              key={option} 
              onSelect={() => handleSelect(option)}>
                {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <input required={required} type="hidden" name={name} value={currentSelected ?? ''} />
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
    </label>
  );
}
