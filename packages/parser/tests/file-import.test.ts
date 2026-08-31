import { describe, expect, test } from 'vitest';
import { parseVue } from '../src';
import { generator } from '@vtj/coder';

const project = {
  name: 'Test',
  pages: [
    {
      id: 'page-1',
      type: 'page' as const,
      name: 'HomePage',
      title: 'Home',
      filePath: 'system/HomePage'
    }
  ],
  blocks: [
    {
      id: 'block-1',
      type: 'block' as const,
      name: 'UserCard',
      title: 'Card',
      filePath: 'user/UserCard'
    }
  ]
};

describe('schema block imports', () => {
  test('keeps block ids through DSL to Vue to DSL conversion', async () => {
    const source = await generator({
      dsl: {
        id: 'page-1',
        name: 'HomePage',
        apiMode: 'composition',
        nodes: [
          {
            id: 'node-1',
            name: 'UserCard',
            from: { type: 'Schema', id: 'block-1' }
          }
        ]
      },
      project,
      formatterDisabled: true
    });
    const result = await parseVue({
      project,
      id: 'page-1',
      name: 'HomePage',
      source
    });
    expect(result.nodes?.[0].from).toEqual({
      type: 'Schema',
      id: 'block-1'
    });
  });

  test('resolves alias imports back to stable block ids', async () => {
    const result = await parseVue({
      project,
      id: 'page-1',
      name: 'HomePage',
      source: `<template><UserCard /></template>
        <script setup lang="ts">
        import UserCard from '@/components/user/UserCard.vue';
        </script>`
    });
    expect(result.nodes?.[0].from).toEqual({
      type: 'Schema',
      id: 'block-1'
    });
  });

  test('keeps legacy id imports compatible', async () => {
    const result = await parseVue({
      project,
      id: 'page-1',
      name: 'HomePage',
      source: `<template><UserCard /></template>
        <script setup lang="ts">
        import UserCard from './block-1.vue';
        </script>`
    });
    expect(result.nodes?.[0].from).toEqual({
      type: 'Schema',
      id: 'block-1'
    });
  });

  test('does not treat unregistered local components as schema blocks', async () => {
    const result = await parseVue({
      project,
      id: 'page-1',
      name: 'HomePage',
      source: `<template><SearchForm /></template>
        <script setup lang="ts">
        import SearchForm from './SearchForm.vue';
        </script>`
    });
    expect(result.nodes?.[0].from).toBeFalsy();
  });
});
