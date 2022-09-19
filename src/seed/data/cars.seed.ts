import { v4 as uuid } from 'uuid';
import { Car } from 'src/cars/interfaces/car.interface';

export const CARS_SEED: Car[] = [
	{
		id: uuid(),
		make: 'Ford',
		model: 'Mustang',
	},
	{
		id: uuid(),
		make: 'Chevrolet',
		model: 'Camaro',
	},
	{
		id: uuid(),
		make: 'Dodge',
		model: 'Charger',
	},
];