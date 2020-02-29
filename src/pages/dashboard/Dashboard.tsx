import React, { useState, useEffect } from "react";
import { authenticateUser } from '../../utils/service';
import { fetchPlanetsRequest } from "../../api/planets";
import { useHistory } from "react-router-dom";
import { searchPlanet } from './../../api/planets';
import './_dashboard.scss';
import Loader from "../../components/shared/loader";
import Planet from "../../components/planet/planet";
import Search from "../../components/search/search";

function Dashboard() {
  const history = useHistory();

  const [planets, setPlanets] = useState<any[]>([]);
  // const [maximum, setMaximum] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [selectedPlanet, selectPlanet] = useState('');
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    authenticateUser().then((response: any) => {
      setLoader(true);
      fetchPlanets();
    }).catch((error: any) => {
      history.push('/login');
    });
  }, []);

  const fetchPlanets = () => {
    const url = 'https://swapi.co/api/planets';
    new Promise((resolve, reject) => {
      fetchPlanetsRequest(url, [], resolve, reject)
    }).then((response: any) => {
      designPlanets(response);
    })
  };

  const handleSearchInput = (event: any) => {
    setSearchInput(event.target.value);
    setLoader(true);
    searchPlanet(event.target.value).then((response: any) => {
      if (response.results && response.results.length > 0) {
        designPlanets(response.results);
        selectPlanet('');
      }
    });
  };

  const designPlanets = (planets: any) => {
    let filteredRes: any[] = [];
    planets.forEach((planet: any) => {
      if (isNaN(parseInt(planet.population))) {
        planet.population = 0;
        filteredRes.push(planet);
      }
      else {
        planet.population = parseInt(planet.population);
        filteredRes.push(planet);
      }
    });
    let total = filteredRes.reduce(function (acc, obj) { return acc + obj.population; }, 0);
    setTotal(total);
    setPlanets(filteredRes);
    setLoader(false);
    // let maxValue = filteredRes.reduce((prev: any, current: any) => (prev.population > current.population) ? prev : current);
    // console.log('max value', maxValue);
    // console.log('total value', total);
  };

  const showPlanetInfo = (event: any, name: string) => {
    // let currentNode = event?.currentTarget;
    selectPlanet(name);
  };

  return (
    <div className="dashboard">
      <Search searchInput={searchInput} handleSearchInput={handleSearchInput} />
      {isLoading && <Loader />}
      {planets && planets.length > 0 && <div className="planets">
        {planets.map((planet: any, planetIDx: number) => {
          let dimension = planet.population * 100 / total;
          dimension = planet.population === 0 ? 25 : dimension + 50;
          return <Planet key={planetIDx} planet={planet} showPlanetInfo={showPlanetInfo} dimension={dimension} selectedPlanet={selectedPlanet} />
        })}
      </div>}
    </div>
  );
}

export default Dashboard;
