"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };
  return (
    <div>
      <button
        type="button"
        onClick={() => handleBack()}
        className="mt-10 inline-flex items-center rounded-md bg-pink-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
      >
        Back
      </button>
    </div>
  );
}
