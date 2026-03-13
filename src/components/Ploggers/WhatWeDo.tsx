 import { Calendar, Users, Megaphone, Route } from "lucide-react";
 
 const WhatWeDo = () => {
   const activities = [
     {
       icon: Calendar,
       title: "Weekly Plogging Drives",
       description: "Regular community drives every weekend where we walk, jog, and clean together.",
     },
     {
       icon: Users,
       title: "Community Cleanups",
       description: "Organized cleanup events in parks, streets, and public spaces across the city.",
     },
     {
       icon: Route,
       title: "Awareness Walks",
       description: "Educational walks that spread the message of environmental responsibility.",
     },
     {
       icon: Megaphone,
       title: "Volunteer Coordination",
       description: "Connecting passionate individuals with meaningful opportunities to contribute.",
     },
   ];
 
   return (
     <section id="what-we-do" className="scroll-mt-24 section-padding bg-primary text-primary-foreground">
       <div className="container-wide">
         <div className="text-center max-w-2xl mx-auto mb-12">
           <h2 className="text-3xl sm:text-4xl font-bold mb-4">
             What We Do
           </h2>
           <p className="text-lg opacity-90">
             Our activities are designed to be accessible, consistent, and community-driven. 
             Everyone is welcome, regardless of fitness level or experience.
           </p>
         </div>
 
         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {activities.map((activity, index) => (
             <div
               key={activity.title}
               className="group p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/15 transition-all duration-300 border border-primary-foreground/20"
             >
               <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-foreground/20 mb-5 group-hover:scale-110 transition-transform">
                 <activity.icon className="w-6 h-6" />
               </div>
               <h3 className="text-lg font-semibold mb-2">
                 {activity.title}
               </h3>
               <p className="text-sm opacity-80 leading-relaxed">
                 {activity.description}
               </p>
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default WhatWeDo;