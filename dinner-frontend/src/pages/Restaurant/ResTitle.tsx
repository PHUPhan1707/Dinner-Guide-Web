
const ResTitle = () => {
    return (
        <div
        className="relative w-full min-h-screen flex flex-col items-center justify-center text-center -mt-6"

        >   
        
            
            {/* Overlay to make text readable */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 -z-10"></div>

            {/* Subtitle */}
            <span className="text-lg md:text-xl text-white tracking-wide mb-2">
                FOOD REVIEWS CYCLES
            </span>

            {/* Main Heading */}
            <div
                className="font-bold text-white leading-tight"
                style={{
                    fontFamily: "Newsreader",
                    fontSize: "100px",
                    fontWeight: "500",
                }}
            >
                Taste The
                <span className="block -mt-8">Perspectives</span>
            </div>

            {/* Description */}
            <span className="text-lg md:text-xl text-white mt-3 max-w-2xl leading-relaxed">
                When the feelings get swayed and the decisions seem to unravel,
                <br />
                we come back here and try to see through people’s eyes.
            </span>

           
        </div>
    );
};

export default ResTitle;
