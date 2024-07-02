import { SuperRefinement, z } from 'zod';

export const refineSubSteps: (allowed: string[]) => SuperRefinement<string[]> = (allowed) => {
  return (subSteps, ctx) => {
    const unallowed = subSteps.filter((subStep) => !allowed.includes(subStep));

    if (unallowed.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid sub steps: ${unallowed.join(', ')}`,
      });
    }

    return;
  };
};
