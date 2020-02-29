import React from "react";
import darth from "./../../assets/darth.png";
import "./_loader.scss";

function Loader() {

    return (
        <div className="loader">
            <div className="loader__content">
                <img src={darth} alt="loading poster" />
                <div className="loader--text">KEEP CALM AND MAY THE FORCE BE WITH YOU!</div>
            </div>
        </div>
    );
}

export default Loader;