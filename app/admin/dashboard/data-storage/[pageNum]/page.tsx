import { getBlobs } from "@/app/api/interfaces/files/route";
import UploadButton from "./components/upload";
import DataCard from "./components/data-card";

export default async function DataStoragePage() {
  const blobs = await getBlobs();

  return (
    <section className="min-h-[90dvh]">
      <UploadButton />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 m-4 gap-4">
        {blobs.map((blob) => (
          <DataCard blob={blob} />
        ))}
      </section>
    </section>
  );
}
