/**
 * Narrow accessors over the /schema response. The spec types it loosely, so
 * these guards keep schema-driven UI (status vocabularies, enum lookups)
 * honest about what they read.
 */

export interface EnumDef {
  values: string[];
  ordered?: string | null;
}

interface PropertyDef {
  enum_ref?: string | null;
  enum?: string[] | null;
}

interface SchemaShape {
  enums?: Record<string, EnumDef>;
  entity_types?: Record<string, { properties?: Record<string, PropertyDef> }>;
}

/** Status vocabulary for an entity type, resolved through enum_ref or inline enum. */
export function statusEnumValues(schema: unknown, entityType: string): string[] | null {
  const s = schema as SchemaShape | undefined;
  const prop = s?.entity_types?.[entityType]?.properties?.["status"];
  if (!prop) return null;
  if (prop.enum_ref) return s?.enums?.[prop.enum_ref]?.values ?? null;
  return prop.enum ?? null;
}
