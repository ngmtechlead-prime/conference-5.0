import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Speakers | NGM Conference 5.0",
  description:
    "Meet the inspiring speakers at NGM Conference 5.0. Industry leaders, innovators, and changemakers sharing their insights.",
};

export default function SpeakersPage() {
  return (
    <ComingSoon
      title="Speakers"
      description="We're curating an incredible lineup of speakers for NGM Conference 5.0. Check back soon to discover the industry leaders and innovators who will be sharing their insights."
    />
  );
}
