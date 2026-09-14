import { ContactHeading } from "./ContactHeading";
import { ContactForm } from "./ContactForm";
import { ContactImage } from "./ContactImage";
import Wrapper from "@/components/shared/Wrapper";

export default function ContactSection() {
  return (
    <section className="font-epilogue">
      <Wrapper className="flex flex-col items-center gap-12 py-16 lg:flex-row lg:items-stretch lg:py-24">
        {/* Left: heading + form */}
        <div className="w-full max-w-lg">
          <ContactHeading />
          <ContactForm />
        </div>

        {/* Right: image */}
        <ContactImage />
      </Wrapper>
    </section>
  );
}
