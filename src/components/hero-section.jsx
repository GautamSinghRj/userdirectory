export default function HeroSection() {
    return (
        <div className="relative h-[750px]">
            <img src="../src/assets/hero-section.jpg" alt="Hero section background" className="z-10 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-20 gap-12 mt-72">
                <p className="drop-shadow-lg font-extrabold text-7xl max-w-7xl">
                    My Blog. My First Project.</p>
                <p className="drop-shadow-lg font-extralight text-2xl max-w-4xl leading-relaxed">
                    This is the hero section of my project.
                </p>
            </div>
        </div>
    );
}