 import { TreePine, Users, Sparkles, MapPin } from "lucide-react";
 
 const WhyItMatters = () => {
   const reasons = [
     {
       icon: TreePine,
       title: "Cleaner Neighborhoods",
       description: "Every drive leaves streets, parks, and public spaces visibly cleaner and more welcoming.",
     },
     {
       icon: Users,
       title: "Healthier Habits",
       description: "Combine physical activity with purpose — exercise that benefits both body and community.",
     },
     {
       icon: Sparkles,
       title: "Shared Responsibility",
       description: "Build civic pride and collective ownership of the spaces we share with our neighbors.",
     },
     {
       icon: MapPin,
       title: "Local Pride",
       description: "Chh. Sambhajinagar is our home. Taking care of it is how we show we belong.",
     },
   ];
 
   return (
     <section id="why-it-matters" className=" scroll-mt-24 section-padding">
       <div className="container-wide">
         <div className="grid lg:grid-cols-2 gap-12 items-center">
           <div>
             <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
               Why It Matters
             </h2>
             <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
               Plogging isn't about perfection — it's about participation. When people 
               come together to care for their surroundings, something powerful happens: 
               communities become more connected, spaces become more valued, and change 
               becomes visible.
             </p>
             <p className="text-lg text-muted-foreground leading-relaxed">
               In Chh. Sambhajinagar, we believe that small actions, done consistently 
               and collectively, create the kind of change that lasts.
             </p>
           </div>
 
           <div className="grid sm:grid-cols-2 gap-6">
             {reasons.map((reason, index) => (
               <div
                 key={reason.title}
                 className="p-6 rounded-xl bg-gradient-to-br from-secondary/50 to-secondary/20 border border-border/30 hover:border-primary/30 transition-colors"
               >
                 <reason.icon className="w-8 h-8 text-primary mb-4" />
                 <h3 className="font-semibold text-foreground mb-2">
                   {reason.title}
                 </h3>
                 <p className="text-sm text-muted-foreground">
                   {reason.description}
                 </p>
               </div>
             ))}
           </div>
         </div>
       </div>
     </section>
   );
 };
 
 export default WhyItMatters;