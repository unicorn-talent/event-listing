"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRequestData } from "./api";
import Error from "@/components/Error";

interface APIResponse {
  data: [];
  error: string;
}

interface EventType {
  id: number;
  title: string;
  location: string;
  date: string;
}

export default function Home() {
  const router = useRouter();
  const [eventLists, setEventLists] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");

  const handleEvent = (id: number) => {
    router.push(`/events/${id}`);
  };

  const handleSearch = async () => {
    const res: APIResponse = await getRequestData(
      `get-events-by-title?search_text=${searchText}`
    );
    setEventLists(res.data);
    if (res.error !== "") {
      setError(res.error);
    }
  };

  const getAllEvents = async () => {
    const res = await getRequestData("get-all-events");
    setEventLists(res.data);
    if (res.error !== "") {
      setError(res.error);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

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
          Event List
        </h1>
        {error === "" ? (
          <>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  onChange={(e) => setSearchText(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-pink-300 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="sm:col-span-3">
                <button
                  type="button"
                  onClick={() => handleSearch()}
                  className="inline-flex items-center rounded-md bg-pink-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="overflow-x-auto mt-10">
              <div className="p-1.5 w-full inline-block align-middle">
                <div className="overflow-x-auto border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-pink-300">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                        >
                          Location
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 cursor-pointer">
                      {eventLists.length > 0 &&
                        eventLists.map((event: EventType, index: number) => (
                          <tr
                            onClick={() => handleEvent(event?.id)}
                            key={index}
                            className="hover:bg-pink-50"
                          >
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {event?.title}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {event?.date}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 font-medium text-right whitespace-nowrap">
                              {event?.location}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Error error={error} />
        )}
      </div>
    </div>
  );
}
