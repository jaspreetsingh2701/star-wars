import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authenticateUser } from '../../utils/service';
import { fetchPlanetsRequest } from "../../api/planets";
import { searchPlanet } from './../../api/planets';
import Loader from "../../components/shared/loader";
import Planet from "../../components/planet/planet";
import Search from "../../components/search/search";
import { BASE_URL } from "../../utils/constants";
import { IPlanet } from './types';
import './_dashboard.scss';
import { getItem } from './../../utils/service';

function Dashboard() {
  const history = useHistory();

  let timerRef: any;
  const [planets, setPlanets] = useState<any[]>([]);
  // const [maximum, setMaximum] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [selectedPlanet, selectPlanet] = useState('');
  const [isLoading, setLoader] = useState(false);
  const [timer, setTimer] = useState(false);
  const [searchCounter, setSearchCounter] = useState(0);

  useEffect(() => {
    authenticateUser().then(() => {
      setLoader(true);
      fetchPlanets();
    }).catch(() => {
      history.push('/login');
    });
  }, []);

  const fetchPlanets = () => {
    const url = `${BASE_URL}planets`;
    new Promise((resolve, reject) => {
      fetchPlanetsRequest(url, [], resolve, reject)
    }).then((response: any) => {
      console.log('response', response);
      designPlanets(response);
    })
  };

  const setTimerCallback = () => {
    setTimer(true);
    timerRef = setTimeout(() => {
      clearTimeout(timerRef);
      setSearchCounter(0);
      setTimer(false);
    }, 1000 * 60);
  }

  const handleSearchInput = (event: any) => {
    const value = event?.target.value;
    const user = getItem('user');
    setSearchInput(value);
    if (!timer) {
      setTimerCallback();
    }
    if (user.name !== 'Luke Skywalker') {
      if (searchCounter <= 15) {
        setLoader(true);
        setSearchCounter(searchCounter+1);
        searchPlanetRequest(value);
      }
      if (searchCounter === 16) {
        alert('Kindly wait for a minute to search the planets.');
      }
    }
    else {
      setLoader(true);
      searchPlanetRequest(value);
    }
  };

  const searchPlanetRequest = (value: string) => {
    searchPlanet(value).then((response: any) => {
      setLoader(false);
      if (response.results && response.results.length > 0) {
        designPlanets(response.results);
        selectPlanet('');
      }
    });
  }

  const designPlanets = (planets: IPlanet[]) => {
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
    let total: number = filteredRes.reduce(function (acc, obj) { return acc + obj.population; }, 0);
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
          let dimension: number = planet.population * 100 / total;
          dimension = planet.population === 0 ? 25 : dimension + 50;
          return <Planet key={planetIDx} planet={planet} showPlanetInfo={showPlanetInfo} dimension={dimension} selectedPlanet={selectedPlanet} />
        })}
      </div>}
    </div>
  );
}

export default Dashboard;
