import { useUser } from '@/lib/auth';
import { cn } from '@/lib/utils';

export default function UserProfilePage() {
  const user = useUser();

  if (!user) {
    return <>User not found</>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h4>{user.username}</h4>
        <span
          className={cn(
            ' rounded-full px-2 py-0.5 text-xs ring-1',
            user.active
              ? 'bg-green-500/20 text-green-700 ring-green-500'
              : 'bg-neutral-300/20 text-neutral-400 ring-neutral-300',
          )}
        >
          active
        </span>
      </div>

      <ul className="flex flex-col gap-2">
        {Object.entries(user.claims).map(([key, value]) => (
          <li key={key} className="text-sm">
            <span className="font-semibold text-neutral-400">{key}</span>: <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
