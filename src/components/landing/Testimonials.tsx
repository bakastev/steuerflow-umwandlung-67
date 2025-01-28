const testimonials = [
  {
    quote: "Mit der Geschäftsführerstrategie spare ich monatlich mehrere tausend Euro Steuern. Ich wünschte, ich hätte das früher gewusst!",
    author: "Thomas M., Geschäftsführer",
  },
  {
    quote: "Die Umsetzung war super einfach, und mein Steuerberater war beeindruckt.",
    author: "Sarah K., Unternehmerin",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Das sagen unsere Kunden
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-8 bg-white rounded-lg shadow-lg animate-fadeIn"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <p className="text-lg text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
              <p className="text-accent font-semibold">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};