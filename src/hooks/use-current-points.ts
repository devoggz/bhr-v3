import { useSession } from "next-auth/react";

export const useCurrentPoints = () => {
  const session = useSession();

  return session.data?.user?.points;
};
