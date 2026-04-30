'use client';

import { useTranslations } from 'next-intl';

export default function Features() {
  const t = useTranslations('features');

  const features = [
    { icon: '🎤', title: t('talk.title'), description: t('talk.desc') },
    { icon: '🛠️', title: t('workshop.title'), description: t('workshop.desc') },
    { icon: '🤝', title: t('networking.title'), description: t('networking.desc') },
    { icon: '🏆', title: t('awards.title'), description: t('awards.desc') },
  ];

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold mb-4">{t('eyebrow')}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-8 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
