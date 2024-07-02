import { Info } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip/tooltip-exports";

interface TooltipCompProps {
  text: string | undefined;
}

export function InfoTooltip({ text }: TooltipCompProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className='text-slate-300' size={16} />
        </TooltipTrigger>
        <TooltipContent>
          <p className='max-w-72'>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

