import { Skeleton } from "../../components/skeleton";

export default function EntitiesSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <Skeleton className="h-[125px] w-full rounded-xl" />
    </div>
  );
}
