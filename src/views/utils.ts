import { cn, tw } from '@/lib/utils';

export const navlink = (isActive: boolean) => {
  return cn(tw`inline-flex w-full gap-2 rounded px-3 py-2`, isActive && tw` bg-slate-100`);
};

export const subNavlink = (isActive: boolean) => {
  return cn(
    tw`inline-flex w-full gap-1 rounded px-1 py-2 text-sm text-slate-400`,
    isActive && tw`bg-slate-100 text-slate-900`,
  );
};
