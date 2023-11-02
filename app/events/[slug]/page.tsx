import { getRequestData } from "@/app/api";
import BackButton from "@/components/BackButton";
import EventDetailField from "@/components/EventDetailField";
import { notFound } from "next/navigation";

interface APIResponse {
  data: {
    title: string;
    date: string;
    location: string;
    description: string;
  };
  error: string;
}

export default async function EventDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const eventDetail: APIResponse = await getRequestData(`get-event/${slug}`);

  if (eventDetail.error === "") {
    return (
      <div className="flex flex-col">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto w-full max-w-7xl px-4 py-16">
          <h1 className="text-4xl font-bold tracking-tight text-fuchsia-500 sm:text-6xl">
            Event Detail
          </h1>
          <div className="mt-20 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <EventDetailField label="Title" value={eventDetail.data.title} />
              <EventDetailField label="Date" value={eventDetail.data.date} />
              <EventDetailField
                label="Location"
                value={eventDetail.data.location}
              />
              <EventDetailField
                label="Description"
                value={eventDetail.data.description}
              />
            </dl>
          </div>
          <BackButton />
        </div>
      </div>
    );
  } else {
    notFound();
  }
}
