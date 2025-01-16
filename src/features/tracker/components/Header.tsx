import { getGreeting } from "../utils/utils";

export const Header = () => {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-medium text-white">{getGreeting()}</h1>
      <p className="text-zinc-400">
        Let&apos;s see what we&apos;ve got to do today.
      </p>
    </div>
  );
};
