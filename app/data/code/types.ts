import type { CodeFile } from '~/types/code';

const utilityTypes: CodeFile = {
  name: 'utility-types.ts',
  type: 'typescript',
  content: `// This file contains a collection of utility types that I find useful in my TypeScript projects.
// These types are designed to help with common type transformations and manipulations, 
// making it easier to work with complex types and improve type safety.

// Primitive types (+ Date) are themselves. Or maybe undefined.
type PartialDeep<T> = T extends string | number | bigint | boolean | null | undefined | symbol | Date
  ? T | undefined
  // Arrays, Sets and Maps and their readonly counterparts have their items made
  // deeply partial, but their own instances are left untouched
  : T extends Array<infer ArrayType>
    ? Array<PartialDeep<ArrayType>>
    : T extends ReadonlyArray<infer ArrayType>
      ? ReadonlyArray<ArrayType>
      : T extends Set<infer SetType>
        ? Set<PartialDeep<SetType>>
        : T extends ReadonlySet<infer SetType>
          ? ReadonlySet<SetType>
          : T extends Map<infer KeyType, infer ValueType>
            ? Map<PartialDeep<KeyType>, PartialDeep<ValueType>>
            : T extends ReadonlyMap<infer KeyType, infer ValueType>
              ? ReadonlyMap<PartialDeep<KeyType>, PartialDeep<ValueType>>
            // ...and finally, all other objects.
              : {
                  [K in keyof T]?: PartialDeep<T[K]>;
                };

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

// Helper Type: Ermöglicht Pick mit spezifischen Typen für die Properties
// TypeOverrides darf nur Keys enthalten, die auch in Keys angegeben sind
type PickWithTypes<
  Base,
  Keys extends keyof Base,
  TypeOverrides,
> = Exclude<keyof TypeOverrides, Keys> extends never
  ? { [K in Keys]: K extends keyof TypeOverrides ? TypeOverrides[K] : Base[K] }
  : { ERROR: 'TypeOverrides contains invalid keys', InvalidKeys: Exclude<keyof TypeOverrides, Keys> };

// Helper Types für RecordFromType Validierung
type _ValidateMapping<
  SelectedKeys extends string,
  MappingObject extends Record<string, unknown>,
> = [Exclude<Lowercase<SelectedKeys>, keyof MappingObject>] extends [never]
  ? [Exclude<keyof MappingObject, Lowercase<SelectedKeys>>] extends [never]
      ? true
      : { 'ERROR: Extra keys in MappingObject': Exclude<keyof MappingObject, Lowercase<SelectedKeys>> }
  : { 'ERROR: Missing required keys in MappingObject': Exclude<Lowercase<SelectedKeys>, keyof MappingObject> };

// Helper Type: Validiert, dass SelectedKeys Teil von UnionType sind, und gibt MappingObject zurück
// Prüft auch, dass alle SelectedKeys im MappingObject implementiert sind (lowercase)
// Bei Fehlern wird ein Error-Object als Type zurückgegeben
// Beispiel: RecordFromType<'A' | 'B' | 'C', 'A' | 'B', {a: string, b: number}>
type RecordFromType<
  UnionType extends string,
  SelectedKeys extends UnionType,
  MappingObject extends Record<string, unknown>,
  _Validator = _ValidateMapping<SelectedKeys, MappingObject>,
> = _Validator extends true ? MappingObject : _Validator;

// Helper Type: Generiert automatisch ein Record-Objekt aus Keys mit optionalem Präfix
// Beispiel: AutoRecord<'A' | 'B'> = { a: any, b: any }
// Beispiel: AutoRecord<'Postings' | 'Avatars', 'has'> = { hasPostings: any, hasAvatars: any }
// Beispiel: AutoRecord<Extract<RpgFeatures, 'Postings' | 'Avatars'>, '', string> = { postings: string, avatars: string }
type AutoRecord<
  Keys extends string,
  Prefix extends string = '',
  ValueType = any,
> = {
  [K in Keys as Prefix extends '' ? Lowercase<K> : \`\${Lowercase<Prefix>}\${Capitalize<Uncapitalize<K>>}\`]: ValueType;
};

export type {
  AutoRecord,
  PartialDeep,
  PickWithTypes,
  Prettify,
  RecordFromType,
};`,
};

export {
  utilityTypes,
};
