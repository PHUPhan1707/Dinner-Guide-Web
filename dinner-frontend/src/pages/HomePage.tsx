

const HomePage = () => {
    return (
        <div className="relative w-full min-h-screen-95px">
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">

                <span
                    className="absolute text-0.4xl text-white"
                    style={{ top: "10px" }}
                >
                    FOOD REVIEWS CYCLES
                </span>

                <div
                    className="font-bold tracking-tighter text-white"
                    style={{
                        fontFamily: "Newsreader",
                        fontSize: "100px",
                        fontWeight: "500",
                    }}
                >
                    Taste The
                    <span
                        style={{
                            display: "block",
                            marginTop: "-70px",
                        }}
                    >
                        Perspectives
                    </span>
                </div>

                <span className="text-xl text-white mt-1 max-w-xl">
                    When the feelings get swayed and the decisions seem to unravel,
                    <br />
                    <span className="text-lg">we</span> come back here and try to see through people’s eyes.
                </span>

                <div style={{ marginTop: "15px", textAlign: "center" }}>
                    <div
                        style={{
                            position: "relative",
                            display: "inline-block",
                            cursor: "pointer",
                            transition: "all 0.3s",

                        }}
                    >
                        {/* Đường thẳng ở trên */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: "2px",
                                backgroundColor: "yellow"
                            }}
                        />
                        {/* Đường thẳng ở dưới */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: "2px",
                                backgroundColor: "yellow"
                            }}
                        />
                        {/* Nội dung */}
                        <div
                            style={{
                                fontFamily: "Newsreader",
                                fontSize: "50px",
                                fontWeight: "500",
                                color: "white"
                            }}
                        >
                            See the reviews
                        </div>
                    </div>
                </div>


            </div>



        </div>
    );
};

export default HomePage;
