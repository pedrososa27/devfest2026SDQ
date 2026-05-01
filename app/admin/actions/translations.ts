'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const EN_PATH = path.join(process.cwd(), 'messages', 'en.json');
const ES_PATH = path.join(process.cwd(), 'messages', 'es.json');

export type TranslationsData = Record<string, unknown>;

export async function getTranslations(): Promise<{ en: TranslationsData; es: TranslationsData }> {
  const [enRaw, esRaw] = await Promise.all([
    fs.readFile(EN_PATH, 'utf-8'),
    fs.readFile(ES_PATH, 'utf-8'),
  ]);
  return {
    en: JSON.parse(enRaw) as TranslationsData,
    es: JSON.parse(esRaw) as TranslationsData,
  };
}

export async function saveTranslationSection(
  section: string,
  enSection: TranslationsData,
  esSection: TranslationsData,
): Promise<{ error?: string }> {
  const [enRaw, esRaw] = await Promise.all([
    fs.readFile(EN_PATH, 'utf-8'),
    fs.readFile(ES_PATH, 'utf-8'),
  ]);

  const en = JSON.parse(enRaw) as TranslationsData;
  const es = JSON.parse(esRaw) as TranslationsData;

  if (!(section in en)) return { error: `Sección inválida: ${section}` };

  en[section] = enSection;
  es[section] = esSection;

  await Promise.all([
    fs.writeFile(EN_PATH, JSON.stringify(en, null, 2) + '\n', 'utf-8'),
    fs.writeFile(ES_PATH, JSON.stringify(es, null, 2) + '\n', 'utf-8'),
  ]);

  revalidatePath('/[locale]', 'layout');
  return {};
}
