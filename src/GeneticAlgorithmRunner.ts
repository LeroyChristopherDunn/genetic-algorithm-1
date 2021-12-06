import {Byte} from "./ByteConverter";

export type Mutation = Byte[];

const SELECTION_POPULATION_SIZE = 4;

type PopulationStats = {
    size: number,
    avg: number | string,
    std: number | string,
    max: number | string,
    accuracy: number | string,
};

export class GeneticAlgorithmRunner{

    constructor(
        private readonly fitnessFunction: (mutation: Mutation) => number,
        private readonly optimalMutation: Mutation,
    ) {}

    run(initialPopulation: Mutation[], maxNumGenerations: number){

        let currentPopulation = initialPopulation;
        let stats = getPopulationStats(currentPopulation, this.optimalMutation, this.fitnessFunction);
        let bestMutation = sortPopulationByFitness(currentPopulation, this.fitnessFunction)[0];
        logProgress(0, stats, bestMutation);

        for (let i = 1; i <= maxNumGenerations; i++) {

            const sortedPopulation = sortPopulationByFitness(currentPopulation, this.fitnessFunction);

            const selectionPopulation = sortedPopulation.slice(0, SELECTION_POPULATION_SIZE);
            const crossOverPopulation = createCrossOverPopulation(selectionPopulation);
            const randomMutationPopulation = [...selectionPopulation, ...crossOverPopulation]
                .map(mutation => randomlyMutate(mutation));

            currentPopulation = [...selectionPopulation, ...crossOverPopulation, ...randomMutationPopulation];
            stats = getPopulationStats(currentPopulation, this.optimalMutation, this.fitnessFunction);
            bestMutation = sortPopulationByFitness(currentPopulation, this.fitnessFunction)[0];
            logProgress(i, stats, bestMutation);
        }
    }
}

function getPopulationStats(
    population: Mutation[],
    optimalMutation: Mutation,
    fitnessFunction: (mutation: Mutation) => number,
): PopulationStats {
    const populationFitnessScores = population.map(fitnessFunction);
    const bestMutation = sortPopulationByFitness(population, fitnessFunction)[0];
    return {
        size: populationFitnessScores.length,
        avg: getAvg(populationFitnessScores).toFixed(6),
        std: getStandardDeviation(populationFitnessScores).toFixed(2),
        max: Math.max(...populationFitnessScores).toFixed(6),
        accuracy: (fitnessFunction(bestMutation) / fitnessFunction(optimalMutation)).toFixed(4),
    }
}

function getAvg(arr: number[]) {
    const total = arr.reduce((acc, c) => acc + c, 0);
    return total / arr.length;
}

function getStandardDeviation (arr: number[]) {
    const n = arr.length
    const mean = arr.reduce((a, b) => a + b) / n
    return Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

const sortPopulationByFitness = (population: Mutation[], fitnessFunction: (mutation: Mutation) => number) =>
    population
    .map(mutation => ({mutation, fitness: fitnessFunction(mutation)}))
    .sort((a, b) => b.fitness - a.fitness)
    .map(evaluation => evaluation.mutation);

function createCrossOverPopulation(population: Mutation[]){
    const childPopulation = [];
    for (let i = 0; i < population.length -1; i++) {
        for (let j = i + 1; j < population.length; j++) {
            const newMutation = randomCrossOver(population[i], population[j]);
            childPopulation.push(...newMutation);
        }
    }
    return childPopulation;
}

function randomCrossOver(mutation1: Mutation, mutation2: Mutation): Mutation[]{
    const minLength = Math.min(mutation1.length, mutation2.length);
    const index = Math.round(Math.random() * (minLength - 1));
    return [
        [...mutation1.slice(0, index), ...mutation2.slice(index)],
        [...mutation2.slice(0, index), ...mutation1.slice(index)],
    ]
}

function randomlyMutate(mutation: Mutation): Mutation {
    const randomIndex = Math.round(Math.random() * (mutation.length - 1));
    let newMutation = [...mutation];
    newMutation[randomIndex] = newMutation[randomIndex] ? 0 : 1;
    return newMutation;
}

const logProgress = (generationIndex: number, stats: PopulationStats, bestMutation: Mutation) =>
    console.log(
        `generation ${generationIndex} ` +
        `\t size ${stats.size} ` +
        `\t avg ${stats.avg} ` +
        `\t std ${stats.std} ` +
        `\t max ${stats.max} ` +
        `\t acc ${stats.accuracy}` +
        `\t best ${bestMutation}`
    );