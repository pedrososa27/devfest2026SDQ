export default function Features() {
  const features = [
    {
      icon: '🎤',
      title: 'Expert Talks',
      description: 'Learn from industry leaders and innovators sharing their insights and experiences.',
    },
    {
      icon: '🛠️',
      title: 'Hands-on Workshops',
      description: 'Get practical experience with the latest technologies and frameworks.',
    },
    {
      icon: '🤝',
      title: 'Networking',
      description: 'Connect with fellow developers, entrepreneurs, and tech enthusiasts.',
    },
    {
      icon: '🏆',
      title: 'Awards & Recognition',
      description: 'Celebrate excellence in the developer community.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold mb-4">WHY ATTEND</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What's Inside DevFest
          </h2>
        </div>

        {/* Grid */}
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
