export default function HeroSection() {
    return (
        <div className="relative h-[400px] md:h-[750px] mb-6 md:mb-10">
            <img src="/herosection.jpg" alt="Hero section background" className="z-10 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-20 gap-6 md:gap-12 md:mt-72">
                <p className="drop-shadow-lg font-extrabold text-2xl sm:text-4xl md:text-7xl max-w-xs md:max-w-7xl">
                    My Blog. My First NextJs Project.</p>
                <p className="drop-shadow-lg font-extralight text-sm md:text-2xl max-w-xs md:max-w-4xl leading-relaxed">
                    This is the hero section of my project.
                </p>
            </div>
        </div>
    );
}