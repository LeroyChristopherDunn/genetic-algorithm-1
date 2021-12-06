import {ByteConverter} from "./ByteConverter";
import {GeneticAlgorithmRunner, Mutation} from "./GeneticAlgorithmRunner";

const INITIAL_POPULATION_SIZE = 32;
const NUM_ITERATIONS = 20;

const NUM_BINARY_DIGITS = 24;
const NUM_BINARY_VALUES = Math.pow(2, NUM_BINARY_DIGITS);

const fitnessFunction = (mutation: Mutation) => Math.pow(ByteConverter.toNumber(mutation) / NUM_BINARY_VALUES, 2);

const initialPopulation: Mutation[] = new Array(INITIAL_POPULATION_SIZE).fill(0)
    .map(() => Math.random() * NUM_BINARY_VALUES)
    .map(num => Math.round(num))
    .map(num => ByteConverter.toBitArray(num, NUM_BINARY_DIGITS));

const optimalMutation: Mutation = initialPopulation[0].map(() => 1);

new GeneticAlgorithmRunner(fitnessFunction, optimalMutation)
    .run(initialPopulation, NUM_ITERATIONS);
