export default function About() {
  return (
    <div className="min-h-screen bg-[#f5f5dc] py-16">
      <div className="max-w-3xl mx-auto px-8">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif text-black mb-4">Our Story</h1>
          <p className="text-black/70">A journey of faith, purpose, and design.</p>
        </div>

        {/* Mission Statement */}
        <div className="prose prose-lg mx-auto text-black/80">
          <p className="text-xl font-serif text-center mb-12">
            "We believe in creating clothing that carries meaning, inspires faith, and celebrates the journey of life."
          </p>

          {/* Story Sections */}
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-serif text-black mb-4">Our Beginning</h2>
              <p>
                Izzles was born from a simple idea: that clothing can be both beautiful and meaningful. 
                We started in a small studio, crafting designs that spoke to the heart of faith and life's journey.
                Each piece we create is thoughtfully designed to remind us of grace, strength, and the mountains 
                we can move with faith.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-black mb-4">Our Mission</h2>
              <p>
                Our mission is to create clothing that inspires and uplifts. We believe in the power of 
                wearing your faith, not just through words, but through thoughtful, minimalist designs that 
                spark conversations and remind us of what truly matters.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-black mb-4">Our Values</h2>
              <ul className="list-none space-y-6">
                <li>
                  <h3 className="text-xl font-serif text-black mb-2">Purpose in Design</h3>
                  <p>Every piece we create has intention and meaning behind it.</p>
                </li>
                <li>
                  <h3 className="text-xl font-serif text-black mb-2">Quality Craftsmanship</h3>
                  <p>We use premium materials and pay attention to every detail.</p>
                </li>
                <li>
                  <h3 className="text-xl font-serif text-black mb-2">Sustainable Practices</h3>
                  <p>We're committed to responsible production and ethical practices.</p>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-black mb-4">Join Our Journey</h2>
              <p>
                We're more than just a clothing brand – we're a community of believers, dreamers, and 
                doers. Each piece we create is an invitation to wear your journey and share your story.
                We're grateful to have you as part of our story, and we can't wait to be part of yours.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 