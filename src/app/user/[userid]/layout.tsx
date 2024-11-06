import Slidebar from "@/components/dashboard/SlideBar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-[#1D022A]">
      <Slidebar username="JohnDoe" fullName="John Doe" />
      <main className="">{children}</main>
    </div>
  )
}