import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Brand } from './entities/brand.entity';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {

	private brands: Brand[] = [
		// {
		// 	id: uuid(),
		// 	name: 'Brand 1',
		// 	createdAt: new Date().getTime(),
		// },
		// {
		// 	id: uuid(),
		// 	name: 'Brand 2',
		// 	createdAt: new Date().getTime(),
		// },
		// {
		// 	id: uuid(),
		// 	name: 'Brand 3',
		// 	createdAt: new Date().getTime(),
		// },
	];

	create( createBrandDto: CreateBrandDto ) {

		const { name } = createBrandDto;

		const brand: Brand = {
			id: uuid(),
			name: name.toLowerCase(),
			createdAt: new Date().getTime(),
		};

		this.brands.push( brand );

		return brand;

	}

	findAll() {
		return this.brands;
	}

	findOne( id: string ) {

		const brand = this.brands.find( brand => brand.id === id );

		if ( !brand ) throw new NotFoundException( `Brand #${ id } not found` );

		return brand;

	}

	update( id: string, updateBrandDto: UpdateBrandDto ) {

		const brandDB = this.findOne( id );

		this.brands = this.brands.map( brand => {
			if ( brand.id === id ) {
				return {
					...brandDB,
					...updateBrandDto,
					updatedAt: new Date().getTime()
				};
			}
			return brand;
		} );

		return updateBrandDto;

	}

	remove( id: string ) {

		this.findOne( id );

		this.brands = this.brands.filter( brand => brand.id !== id );

		return `Brand #${ id } deleted`;

	}

	fillBrandsWithSeedData( brands: Brand[] ) {

		this.brands = brands;

	}
}
