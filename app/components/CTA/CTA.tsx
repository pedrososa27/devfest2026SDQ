export default function CTA() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Join DevFest?
        </h2>
        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Don't miss this opportunity to connect with developers, learn from experts, and shape the future of technology in the Caribbean.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold text-lg">
            Get Your Ticket Now
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/20 transition font-semibold text-lg">
            Learn About Sponsorships
          </button>
        </div>
      </div>
    </section>
  );
}
