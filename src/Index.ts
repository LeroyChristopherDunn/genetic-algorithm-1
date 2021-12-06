import {ByteConverter} from "./ByteConverter";
import {GeneticAlgorithmRunner, Mutation} from "./GeneticAlgorithmRunner";

const INITIAL_POPULATION_SIZE = 32;
const NUM_ITERATIONS = 20;

const NUM_DIGITS = 24;
const MAX_VALUE = 16777215;

const fitnessFunction = (mutation: Mutation) => Math.pow(ByteConverter.toNumber(mutation) / MAX_VALUE, 2);

const initialPopulation: Mutation[] = new Array(INITIAL_POPULATION_SIZE).fill(0)
    .map(() => Math.random() * MAX_VALUE)
    .map(num => Math.round(num))
    .map(num => ByteConverter.toBitArray(num, NUM_DIGITS));

const optimalMutation: Mutation = initialPopulation[0].map(() => 1);

new GeneticAlgorithmRunner(fitnessFunction, optimalMutation)
    .run(initialPopulation, NUM_ITERATIONS);
