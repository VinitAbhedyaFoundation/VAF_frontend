 import { Footprints, Trash2, Heart } from "lucide-react";
 
 const WhatIsPlogging = () => {
   const steps = [
     {
       icon: Footprints,
       title: "Walk or Jog",
       description: "Start with a simple walk or jog through your neighborhood, park, or any public space.",
     },
     {
       icon: Trash2,
       title: "Collect Litter",
       description: "Pick up trash and litter along the way. Every piece counts towards a cleaner community.",
     },
     {
       icon: Heart,
       title: "Care Together",
       description: "Join others who care about our shared spaces. Together, we make a visible difference.",
     },
   ];
 
   return (
     <section id="what-is-plogging" className="scroll-mt-24 section-padding bg-secondary/30">
       <div className="container-wide">
         <div className="text-center max-w-2xl mx-auto mb-12">
           <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
             What is Plogging?
           </h2>
           <p className="text-lg text-muted-foreground">
             Born in Sweden, plogging is a global movement that turns everyday exercise 
             into environmental action. It's simple, inclusive, and impactful.
           </p>
         </div>
 
         <div className="grid md:grid-cols-3 gap-8">
           {steps.map((step, index) => (
             <div
               key={step.title}
               className="group relative bg-card rounded-2xl p-8 card-hover border border-border/50"
               style={{ animationDelay: `${index * 0.1}s` }}
             >
               <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                 <step.icon className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-semibold text-foreground mb-3">
                 {step.title}
               </h3>
               <p className="text-muted-foreground leading-relaxed">
                 {step.description}
               </p>
               <div className="absolute top-6 right-6 text-6xl font-bold text-border/50">
                 {index + 1}
               </div>
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default WhatIsPlogging;