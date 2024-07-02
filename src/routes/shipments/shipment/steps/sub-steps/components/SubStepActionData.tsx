import { useActionData } from 'react-router-dom';

const useSubStepActionData = () => {
  return useActionData() as { errors: { message: string }[] } | undefined;
};

export const SubStepActionData = () => {
  const actionData = useSubStepActionData();

  if (!actionData || !actionData.errors) return null;

  return (
    <pre className="text-sm text-rose-600">{JSON.stringify(actionData.errors, null, '\t')} </pre>
  );
};
