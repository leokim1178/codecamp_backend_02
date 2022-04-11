import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarType } from './entities/carType.entity';

@Injectable()
export class CarTypeService {
    constructor(
        @InjectRepository(CarType)
        private readonly carTypeRepository: Repository<CarType>,
    ) {}

    async create({ type }) {
        const result = await this.carTypeRepository.save({ type }); //카테고리를 데이터베이스에 저장
        console.log(result);
        return result;
    }
}
