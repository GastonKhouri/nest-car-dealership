import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateCarDto, UpdateCarDto } from './dto';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {

	private cars: Car[] = [
		// {
		// 	id: uuid(),
		// 	make: 'Ford',
		// 	model: 'Mustang',
		// },
		// {
		// 	id: uuid(),
		// 	make: 'Chevrolet',
		// 	model: 'Camaro',
		// },
		// {
		// 	id: uuid(),
		// 	make: 'Dodge',
		// 	model: 'Charger',
		// },
	];

	findAll() {
		return this.cars;
	}

	findOneById( id: string ) {

		const car = this.cars.find( car => car.id === id );

		if ( !car ) throw new NotFoundException( `Car #${ id } not found` );

		return car;

	}

	create( createCarDto: CreateCarDto ) {

		const car: Car = {
			id: uuid(),
			...createCarDto,
		};

		this.cars.push( car );
		return createCarDto;

	}

	update( id: string, updateCarDto: UpdateCarDto ) {

		const carDB = this.findOneById( id );

		if ( updateCarDto.id && updateCarDto.id !== id ) {
			throw new NotFoundException( `You can't update the car id` );
		}

		this.cars = this.cars.map( car => {
			if ( car.id === id ) {
				return { ...carDB, ...updateCarDto };
			}
			return car;
		} );

		return updateCarDto;

	}

	delete( id: string ) {

		this.findOneById( id );

		this.cars = this.cars.filter( car => car.id !== id );

		return `Car #${ id } deleted`;

	}

	fillCarsWithSeedData( cars: Car[] ) {

		this.cars = cars;

	}

}
