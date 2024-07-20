import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

export default function page() {
  return (
    <>
      <h1>Download Link Expired</h1>
      <Button asChild size="lg">
        <Link href="/orders">Get New Link</Link>
      </Button>
    </>
  );
}
