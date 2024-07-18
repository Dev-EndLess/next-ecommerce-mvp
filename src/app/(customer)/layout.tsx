import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">My Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}
