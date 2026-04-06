import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Heart, Dog, MapPin, Star, Coffee, Trees } from 'lucide-react';
import { cn } from '@/lib/utils';
export function AboutPage() {
  const cards = [
    {
      title: "Our Pack",
      icon: Dog,
      content: "We're a community of pet parents who believe that 'no dogs allowed' shouldn't be the default. From Great Danes to tiny tabbies, every companion deserves a seat at the table (or at least a spot under it).",
      color: "bg-primary/10"
    },
    {
      title: "The Mission",
      icon: MapPin,
      content: "Our goal is simple: map every whiskers-welcomed cafe, trail-tail-wagging park, and paws-friendly hotel. We help you skip the research and get straight to the adventure.",
      color: "bg-secondary/10"
    },
    {
      title: "Why We Wag",
      icon: Heart,
      content: "Because life is better when your best friend is by your side. We value accessibility, community feedback, and the occasional free dog treat behind the counter.",
      color: "bg-primary/10"
    }
  ];
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <header className="text-center space-y-6 mb-20">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              className="inline-block p-4 bg-primary text-primary-foreground sketch-border-sm mb-4"
            >
              <Star className="h-10 w-10 fill-current" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-sketch text-foreground leading-tight">
              A Whimsical World <br/> For <span className="text-primary underline decoration-wavy decoration-2">Every Tail</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Paws & Places was born from the frustration of being turned away at the door. We built a place where the door is always open.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {cards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className={cn("p-8 sketch-border space-y-4", card.color)}
              >
                <card.icon className="h-10 w-10 text-primary" />
                <h3 className="text-3xl font-sketch">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.content}</p>
              </motion.div>
            ))}
          </div>
          <section className="bg-muted/30 sketch-border p-8 md:p-16 relative overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-sketch text-foreground">Sniffing Out the Best Spots</h2>
                <p className="text-lg text-muted-foreground">
                  Every location in our directory is verified by the community. We look for the little things that matter:
                </p>
                <ul className="space-y-4">
                  {[
                    { icon: Coffee, text: "Water bowls and pup-patties" },
                    { icon: Trees, text: "Off-leash freedom areas" },
                    { icon: MapPin, text: "Easy waste station access" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="p-2 bg-background sketch-border-sm text-primary">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-video sketch-border overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800"
                  className="w-full h-full object-cover"
                  alt="Happy dog exploring"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="border-t-2 border-primary/20 bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p className="font-sketch text-lg mb-2 text-foreground">Paws & Places</p>
          <p className="text-sm">Made with love for tails of all sizes. © 2024</p>
        </div>
      </footer>
    </div>
  );
}