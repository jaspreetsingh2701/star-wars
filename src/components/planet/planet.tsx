import React from "react";

function Planet(props: any) {
    const { planet, showPlanetInfo, selectedPlanet, dimension } = props;
    return (
        <div className="planets__planet">
            <div
                onClick={(event: any) => showPlanetInfo(event, planet.name)}
                className="planets__planet--item" style={{
                    height: selectedPlanet === planet.name ? "300px" : dimension,
                    width: selectedPlanet === planet.name ? "300px" : dimension,
                    boxShadow: selectedPlanet === planet.name ? "20px 20px 0 0 #151515" : "4px 4px 0 0 #151515"
                }}>
                {selectedPlanet === planet.name && <>
                    <div className="planet__content">
                        <div className="planet__content--label">Population: <span>{planet.population}</span></div>
                        <div className="planet__content--label">Rotational Period: <span>{planet.rotation_period}</span></div>
                        <div className="planet__content--label">Orbital Period: <span>{planet.orbital_period}</span></div>
                        <div className="planet__content--label">Diameter: <span>{planet.diameter}</span></div>
                        <div className="planet__content--label">Climate: <span>{planet.climate}</span></div>
                        <div className="planet__content--label">Gravity: <span>{planet.gravity}</span></div>
                        <div className="planet__content--label">Terrain: <span>{planet.terrain}</span></div>
                    </div>
                </>}
            </div>
            <div style={{ fontSize: 10 }}>{planet.name}</div>
        </div>
    );
}

export default Planet;