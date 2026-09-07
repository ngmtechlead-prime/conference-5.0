import type { Metadata } from "next";
import SpeakersGrid from "@/components/speakers/SpeakersGrid";

export const metadata: Metadata = {
  title: "Speakers | NGM Conference 5.0",
  description:
    "Meet the inspiring speakers at NGM Conference 5.0. Industry leaders, innovators, and changemakers sharing their insights.",
};

export default function SpeakersPage() {
  return <SpeakersGrid />;
}
