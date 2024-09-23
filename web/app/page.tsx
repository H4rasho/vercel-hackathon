"use server";
import { redirect } from "next/navigation";

async function scraperAction(data: FormData) {
  "use server";
  const url = data.get("url") as string;
  if (!url) return;
  redirect("/analyze?url=" + url);
}

export default async function Chat() {
  return (
    <main className="grid place-items-center min-h-full">
      <div className="flex flex-col items-center w-full max-w-screen-md mx-auto">
        <h1 className="text-6xl font-bold text-center text-balance">
          Generate alt text for you website with AI
        </h1>
        <form className="w-full flex justify-center" action={scraperAction}>
          <input
            className="w-full px-2 py-4 mb-8 mt-10 border border-gray-300 rounded shadow-md"
            placeholder="https://example.com"
            name="url"
          />
        </form>
      </div>
    </main>
  );
}
