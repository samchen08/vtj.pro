import { describe, expect, test } from 'vitest';
import { dirname, resolve } from 'node:path';
import ts from 'typescript';
import { ProjectModel } from '../../src';
import type {
  BackendSchema,
  BackendFieldSchema,
  BackendJSONValue,
  BackendValidationResult,
  ProjectSchema
} from '../../src';

const base = { id: 'field', name: 'field' };
const schema: BackendSchema = {
  dslVersion: '1.0',
  models: [
    {
      id: 'customer',
      name: 'customer',
      label: '客户',
      fields: [{ ...base, type: 'string', maxLength: 100, required: true }],
      indexes: [{ id: 'name_index', fields: ['field'], unique: true }],
      operations: ['list', 'get', 'create', 'update', 'delete'],
      policies: [
        {
          role: 'member',
          actions: ['list', 'create'],
          scope: 'owner',
          readFields: ['field'],
          writeFields: ['field']
        }
      ]
    }
  ]
};

describe('backend protocol', () => {
  test('checks protocol types using the core tsconfig', () => {
    const configPath = resolve(__dirname, '../../tsconfig.json');
    const config = ts.readConfigFile(configPath, ts.sys.readFile);
    expect(config.error).toBeUndefined();
    const parsed = ts.parseJsonConfigFileContent(
      config.config,
      ts.sys,
      dirname(configPath)
    );
    const program = ts.createProgram({
      rootNames: [...parsed.fileNames, resolve(__dirname, 'backend.test.ts')],
      options: { ...parsed.options, noEmit: true },
      projectReferences: parsed.projectReferences
    });
    const diagnostics = [
      ...parsed.errors,
      ...ts.getPreEmitDiagnostics(program)
    ];
    expect(
      diagnostics.map((item) =>
        ts.flattenDiagnosticMessageText(item.messageText, '\n')
      )
    ).toEqual([]);
  }, 10000);

  test('supports serializable defaults and all field variants', () => {
    const fields: BackendFieldSchema[] = [
      { ...base, type: 'string', maxLength: 40, default: '客户' },
      { ...base, type: 'text', default: '' },
      { ...base, type: 'integer', minimum: 0, default: 1 },
      { ...base, type: 'decimal', precision: 10, scale: 2, default: '1.20' },
      { ...base, type: 'boolean', default: false },
      { ...base, type: 'date', default: '2026-09-07' },
      { ...base, type: 'datetime', default: '2026-09-07T00:00:00Z' },
      { ...base, type: 'enum', values: ['active'], default: 'active' },
      { ...base, type: 'json', default: { items: [null, 1, 'a', false] } },
      { ...base, type: 'reference', targetModelId: 'customer' },
      { ...base, type: 'string', maxLength: 40, nullable: true, default: null }
    ];
    expect(JSON.parse(JSON.stringify(fields))).toEqual(fields);
    expect(JSON.parse(JSON.stringify(schema))).toEqual(schema);
  });

  test('keeps existing project serialization independent of backend data', () => {
    const project: ProjectSchema = { id: 'legacy', name: 'Legacy' };
    const dsl = new ProjectModel(project).toDsl();
    expect(dsl.id).toBe('legacy');
    expect(dsl.name).toBe('Legacy');
    expect(dsl).not.toHaveProperty('backend');
    expect(dsl).not.toHaveProperty('models');
  });

  test('narrows validation results by validity', () => {
    const result: BackendValidationResult = {
      valid: true,
      diagnostics: [],
      truncated: false,
      normalized: schema,
      schemaHash: 'hash'
    };
    expect(result.normalized.dslVersion).toBe('1.0');
  });
});

// The compiler test above checks these assertions; Vitest alone strips types.
function invalidTypes() {
  // @ts-expect-error Only protocol v1 is supported.
  const version: BackendSchema = { dslVersion: '2.0', models: [] };
  // @ts-expect-error No custom code API in v1.
  const code: BackendSchema = { dslVersion: '1.0', models: [], apis: [] };
  // @ts-expect-error Strings require maxLength.
  const string: BackendFieldSchema = { ...base, type: 'string' };
  // @ts-expect-error Decimals use string defaults.
  const decimal: BackendFieldSchema = {
    ...base,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 1.2
  };
  // @ts-expect-error Integer defaults cannot be strings.
  const integer: BackendFieldSchema = {
    ...base,
    type: 'integer',
    default: '1'
  };
  // @ts-expect-error References cannot have defaults.
  const reference: BackendFieldSchema = {
    ...base,
    type: 'reference',
    targetModelId: 'customer',
    default: 'id'
  };
  // @ts-expect-error Null defaults require explicit nullable.
  const nullable: BackendFieldSchema = {
    ...base,
    type: 'boolean',
    default: null
  };
  // @ts-expect-error Variant-specific properties must match the discriminant.
  const mixed: BackendFieldSchema = { ...base, type: 'boolean', maxLength: 10 };
  // @ts-expect-error Strict JSON excludes undefined recursively.
  const json: BackendJSONValue = { nested: [undefined] };
  // @ts-expect-error Failed validation cannot return a normalized schema.
  const result: BackendValidationResult = {
    valid: false,
    diagnostics: [],
    truncated: false,
    normalized: schema
  };
  return [
    version,
    code,
    string,
    decimal,
    integer,
    reference,
    nullable,
    mixed,
    json,
    result
  ];
}
void invalidTypes;
