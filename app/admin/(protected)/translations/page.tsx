import { getTranslations } from '../../actions/translations';
import TranslationsClient from './TranslationsClient';

export const dynamic = 'force-dynamic';

export default async function TranslationsPage() {
  const { en, es } = await getTranslations();

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>
        Traducciones
      </h1>
      <p style={{ color: '#6B6B75', fontSize: 14, marginBottom: 24 }}>
        Edita los textos del sitio en inglés y español lado a lado.
      </p>
      <TranslationsClient en={en} es={es} />
    </div>
  );
}
