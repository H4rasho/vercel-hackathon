"use server";
import { redirect } from "next/navigation";

async function scraperAction(data: FormData) {
  "use server";
  const url = data.get("url") as string;
  if (!url) return;
  redirect("/analyze?url=" + url);
}

export default async function Chat({ params }: { params: { url: string } }) {
  return (
    <main>
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        <form action={scraperAction}>
          <input
            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            placeholder="https://example.com"
            name="url"
          />
        </form>
      </div>
    </main>
  );
}
