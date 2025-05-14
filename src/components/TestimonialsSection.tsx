
const testimonials = [
  {
    quote: "CompanyRadar has transformed how we monitor our competitors. We've discovered strategic shifts weeks before they became public knowledge.",
    author: "Sarah Johnson",
    position: "VP of Strategy, TechCorp"
  },
  {
    quote: "As a VC firm, we use CompanyRadar to keep tabs on our entire portfolio. The employee change tracking alone has been worth the investment.",
    author: "David Chen",
    position: "Partner, Venture Capital Partners"
  },
  {
    quote: "The insights we've gained have directly influenced our product roadmap. We've saved months of development by identifying market gaps early.",
    author: "Michael Rodriguez",
    position: "CEO, StartupInnovate"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-brand-gray">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">
            Industry leaders trust CompanyRadar for their company tracking needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="text-2xl font-serif text-gray-400 mb-4">"</div>
              <p className="text-lg mb-8">{testimonial.quote}</p>
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.position}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
