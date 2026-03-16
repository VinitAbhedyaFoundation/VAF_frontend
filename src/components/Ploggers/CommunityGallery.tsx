 const communityImage1 ="/images/Ploggers/community1.jpeg";
 const communityImage2 ="/images/Ploggers/community2.jpeg";
 const communityImage3 ="/images/Ploggers/community3.jpeg";
 
 const CommunityGallery = () => {
   const images = [
     {
       src: communityImage1,
       caption: "Weekend cleanup drive in the neighborhood",
     },
     {
       src: communityImage2,
       caption: "Bowl painting in action at the park",
     },
     {
       src: communityImage3,
       caption: "Ganpati bappa making activity",
     },
   ];
 
   return (
     <section id="community" className="scroll-mt-24 section-padding">
       <div className="container-wide">
         <div className="text-center max-w-2xl mx-auto mb-12">
           <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
             Community in Action
           </h2>
           <p className="text-lg text-muted-foreground">
             The real heroes are the people who show up, week after week, 
             to make our city a little bit better.
           </p>
         </div>
 
         <div className="grid md:grid-cols-3 gap-6">
           {images.map((image, index) => (
             <div
               key={index}
               className="group relative aspect-square rounded-2xl overflow-hidden"
             >
               <img
                 src={image.src}
                 alt={image.caption}
                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                 <p className="text-sm font-medium">{image.caption}</p>
               </div>
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default CommunityGallery;