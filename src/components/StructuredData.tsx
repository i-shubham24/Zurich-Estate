import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";

/** Renders a JSON-LD script block. Server Component. Escapes < > to prevent </script> breakout. */
function safeJsonLd(obj: object): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(d) }}
        />
      ))}
    </>
  );
}

/** Site-wide Organization + WebSite entities (rendered in the root layout). */
export function OrganizationJsonLd() {
  return <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />;
}
