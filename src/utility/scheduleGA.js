import {
  getStandardDeviation,
  randomInt,
  timeToDate,
} from "./utilityFunctions";

export async function getBestEventProps(
  eventProps,
  populationSize,
  generations
) {
  let bestSchedule = await getBestSchedule(
    eventProps,
    populationSize,
    generations
  );
  let counter = 0;
  for (let i = 0; i < eventProps.events.length; i++) {
    if (eventProps.events[i].type === "dynamic") {
      eventProps.events[i].start = bestSchedule[counter++];
    }
  }
  return eventProps;
}

function getBestSchedule(eventProps, populationSize, generations) {
  return new Promise((resolve) => {
    let dayLength;
    let { startTime, endTime, increment, events } = eventProps;
    let dynamicEvents;

    let population = [];
    let fitness = [];

    let bestSchedule = [];
    let bestScore = -Infinity;

    init();
    for (let i = 0; i < generations; i++) {
      iterate();
    }
    resolve(bestSchedule);

    function init() {
      let startDate = timeToDate(startTime);
      let endDate = timeToDate(endTime);

      const MS_PER_MIN = 60 * 1000;

      dayLength =
        Math.floor((endDate.getTime() - startDate.getTime()) / (MS_PER_MIN * increment));

      dynamicEvents = events.filter((event) => event.type === "dynamic");

      for (let i = 0; i < populationSize; i++) {
        population[i] = [];
        for (let j = 0; j < dynamicEvents.length; j++) {
          population[i].push(randomInt(dayLength - dynamicEvents[j].length));
        }
      }
    }

    function iterate() {
      calculateFitness();
      normalizeFitness();
      nextGeneration();
    }

    function calculateFitness() {
      for (let i = 0; i < population.length; i++) {
        let score = scoreSchedule(population[i]);
        if (score > bestScore) {
          bestScore = score;
          bestSchedule = population[i];
        }
        fitness[i] = score;
      }
    }

    function normalizeFitness() {
      let sum = 0;
      for (let i = 0; i < population.length; i++) {
        sum += fitness[i];
      }
      for (let i = 0; i < population.length; i++) {
        fitness[i] /= sum;
      }
    }

    function nextGeneration() {
      let newPopulation = [];
      for (let i = 0; i < population.length; i++) {
        let scheduleA = pickOne(population, fitness);
        let scheduleB = pickOne(population, fitness);
        let schedule = crossOver(scheduleA, scheduleB);
        mutate(schedule, 0.01);
        newPopulation[i] = schedule;
      }
      population = newPopulation;
    }

    function scoreSchedule(scheduleDNA) {
      let reward = 0;
      let schedule = new Array(dayLength);
      for (let i = 0; i < schedule.length; i++) {
        schedule[i] = [];
      }

      let dynamicCounter = 0;
      for (let i = 0; i < events.length; i++) {
        let start;
        let length = events[i].length;
        if (events[i].type === "dynamic") {
          start = scheduleDNA[dynamicCounter];
          dynamicCounter++;
        } else if (events[i].type === "static") {
          start = events[i].start;
        }
        for (let j = start; j < start + length; j++) {
          schedule[j].push(events[i].name);
        }
      }

      let breaks = [];
      let lastWasBreak = false;
      for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].length > 0) {
          lastWasBreak = false;
          reward -= schedule[i].length - 1;
        } else if (!lastWasBreak) {
          lastWasBreak = true;
          breaks.push(1);
        } else {
          breaks[breaks.length - 1]++;
        }
      }
      reward += 1 / getStandardDeviation(breaks);

      return reward;
    }

    function pickOne(list, prob) {
      let index = 0;
      let r = Math.random();

      while (r > 0) {
        r -= prob[index];
        index++;
      }

      index--;
      return list[index].slice();
    }

    function crossOver(scheduleA, scheduleB) {
      let newSchedule = [];
      for(let i = 0; i < scheduleA.length; i++) {
        if(Math.random() < 0.5) {
          newSchedule.push(scheduleA[i]);
        }else{
          newSchedule.push(scheduleB[i]);
        }
      }
      return newSchedule;
    }

    function mutate(schedule, mutationRate) {
      for(let i = 0; i < schedule.length; i++) {
        if(Math.random() < mutationRate) {
          schedule[i] = randomInt(dayLength - dynamicEvents[i].length);
        }
      }
    }
  });
}
