import Image from "next/image";

export default function InCollaborationWith() {
  return (
    <section className="w-full bg-white py-10 px-4 sm:px-6 lg:px-[150px] border-b border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        <p className="text-[#4a5565] font-epilogue text-sm uppercase tracking-widest">
          in collaboration with
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
          <div className="relative h-[3.25rem] w-52">
            <Image
              src="/logos/collab-logo-1.png"
              alt="Collaboration partner"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-[3.25rem] w-52">
            <Image
              src="/logos/collab-logo-2.png"
              alt="Collaboration partner"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
