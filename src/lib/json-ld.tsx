// Server-rendered JSON-LD injector. Emits one <script type="application/ld+json">
// per object (accepts a single object or an array). Runs on the server — no
// client JS, no hydration cost.
type JsonLdData = Record<string, unknown>;

export default function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
