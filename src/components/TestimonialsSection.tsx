
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "Spyer.ai has transformed how we monitor our competitors. We've discovered strategic shifts weeks before they became public knowledge.",
    author: "Shuo Wang",
    position: "Co-founder, Deel",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop"
  },
  {
    quote: "As a biotech innovator, I use Spyer.ai to keep tabs on industry movements. The employee change tracking alone has been worth the investment.",
    author: "Elizabeth Holmes",
    position: "Founder, Theranos",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-1.2.1&auto=format&fit=crop"
  },
  {
    quote: "The insights we've gained through Spyer.ai have directly influenced our strategic decisions. We've saved months of development by identifying market gaps early.",
    author: "Sam Bankman-Fried",
    position: "Founder, FTX",
    image: "https://images.unsplash.com/photo-1501286353178-1ec871814838?ixlib=rb-1.2.1&auto=format&fit=crop"
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
            Industry leaders trust Spyer.ai for their company tracking needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card bg-white p-8 rounded-xl shadow-md">
              <div className="text-2xl font-serif text-gray-400 mb-4">"</div>
              <p className="text-lg mb-8">{testimonial.quote}</p>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={testimonial.image} alt={testimonial.author} />
                  <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.position}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
