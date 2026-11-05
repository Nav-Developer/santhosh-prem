import CoachingSection from "@/components/sections/CoachingSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Now | Santhosh Prem",
  description: "Choose your goal and start your coaching with Santhosh Prem.",
};

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-[#0b1020] pt-16">
      <CoachingSection />
    </main>
  );
}
