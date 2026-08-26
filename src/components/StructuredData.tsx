import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";

/** Renders a JSON-LD script block. Server Component. */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}

/** Site-wide Organization + WebSite entities (rendered in the root layout). */
export function OrganizationJsonLd() {
  return <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />;
}
