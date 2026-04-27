export default function Speakers() {
  const speakers = [
    {
      name: 'Sarah Chen',
      title: 'Tech Lead at Innovation Labs',
      image: '👩‍💼',
      bio: 'Full-stack developer with 10+ years of experience.',
    },
    {
      name: 'Marcus Johnson',
      title: 'DevOps Architect',
      image: '👨‍💼',
      bio: 'Cloud infrastructure and automation specialist.',
    },
    {
      name: 'Emma Rodriguez',
      title: 'AI/ML Engineer',
      image: '👩‍🔬',
      bio: 'Machine learning and AI products expert.',
    },
    {
      name: 'David Kim',
      title: 'Frontend Specialist',
      image: '👨‍💻',
      bio: 'React and modern web frameworks expert.',
    },
  ];

  return (
    <section id="speakers" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold mb-4">FEATURED SPEAKERS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Learn from the Best
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover insights from industry experts and thought leaders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker) => (
            <div
              key={speaker.name}
              className="text-center p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition"
            >
              <div className="text-7xl mb-4 text-center">{speaker.image}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {speaker.name}
              </h3>
              <p className="text-sm text-blue-600 font-semibold mb-3">
                {speaker.title}
              </p>
              <p className="text-gray-600 text-sm">{speaker.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
