import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
const testimonials = [{
  quote: "Spyer didn't just transform our competitor monitoring—it basically turned us into omniscient overlords. We now casually spot strategic pivots weeks before anyone else even files their press release.",
  author: "Alex Bouaziz",
  position: "Co-founder, Deel",
  image: "/lovable-uploads/46294b2d-d139-4884-9056-66c07c9c0a4d.png"
}, {
  quote: "As a biotech visionary, I use Spyer to stalk industry gossip so obsessively that our 'employee change' alerts feel more like inside jokes. Totally worth every penny—because who needs lab breakthroughs when you can track org charts?",
  author: "Elizabeth Holmes",
  position: "Founder, Theranos",
  image: "/lovable-uploads/aff64051-2314-4b9b-a8c3-0042d1cb9b19.png"
}, {
  quote: "Thanks to Spyer's crystal-ball insights, we've 'saved' entire months of development—if by 'saved' you mean outsourced our market research to an algorithm that already knew what we wanted. Productivity so future-proof it hurts.",
  author: "S. Bankman-Fried",
  position: "Founder, FTX",
  image: "/lovable-uploads/3e91268a-687c-43b8-b9d5-03345bede23f.png"
}];
const TestimonialsSection = () => {
  return <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="container max-w-[1100px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">Industry leaders trust Spyer for their company tracking needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <div key={index} className="testimonial-card bg-white p-8 rounded-xl shadow-md">
              <div className="text-2xl font-serif text-gray-400 mb-4">"</div>
              <p className="text-lg mb-8">{testimonial.quote}</p>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4 overflow-hidden">
                  <AspectRatio ratio={1 / 1} className="h-full w-full">
                    <AvatarImage src={testimonial.image} alt={testimonial.author} className="object-cover" />
                    <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                  </AspectRatio>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.position}</div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;
