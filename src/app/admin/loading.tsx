import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex flex-col justify-center items-center my-32">
      <Loader2 className="size-28 animate-spin" />
      <p className="text-2xl font-semibold">Loading...</p>
    </div>
  )
}
