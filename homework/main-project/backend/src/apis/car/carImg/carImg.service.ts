import { Storage } from '@google-cloud/storage';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'graphql-upload';

import { v4 as uuidv4 } from 'uuid';

import { getToday } from 'src/commons/libraries/utils';
import { Repository } from 'typeorm';
import { CarCustom } from '../carCustom/entities/carCustom.entity';
import { CarImg } from './entities/carImg.entity';

interface ICarImg {
    imgs: FileUpload[];
}

@Injectable()
export class CarImgService {
    constructor(
        @InjectRepository(CarImg)
        private readonly carImgRepository: Repository<CarImg>,
        @InjectRepository(CarCustom)
        private readonly carCustomRepository: Repository<CarCustom>,
    ) {}

    async upload({ imgs }: ICarImg) {
        const storage = new Storage({
            keyFilename: process.env.STORAGE_KEY_FILENAME,
            projectId: process.env.STORAGE_PROJECT_ID,
        }).bucket(process.env.STORAGE_BUCKET);

        const waitedImgs = await Promise.all(imgs);

        const results = await Promise.all(
            waitedImgs.map((el) => {
                return new Promise((resolve, reject) => {
                    const imgName = `${getToday()}/${uuidv4()}/origin/${
                        el.filename
                    }`;
                    el.createReadStream()
                        .pipe(storage.file(imgName).createWriteStream())
                        .on('finish', () =>
                            resolve(`${process.env.STORAGE_BUCKET}/${imgName}`),
                        )
                        .on('error', () => reject());
                });
            }),
        );

        return results;
    }

    async create({ carCustomId, imgURLs }) {
        const carCustom = await this.carCustomRepository.findOne({
            where: { id: carCustomId },
        });

        const result = await imgURLs.map(async (el) => {
            return await this.carImgRepository.save({ imgURL: el, carCustom });
        });

        return result;
    }
    async updateImg({ carCustomId, imgURLs }) {
        //1. carCustomId??? ???????????? ??????
        const carCustom = await this.carCustomRepository.findOne({
            where: { id: carCustomId },
        });
        if (!carCustom)
            throw new UnprocessableEntityException(
                '???????????? ?????? carCustomId ?????????',
            );
        //2. carCustomId??? ???????????? ???????????? ????????????
        const carCustomURLs = await this.carImgRepository.find({
            where: { carCustom: carCustomId },
        });

        //3. carCustomId??? ????????? ????????? ??? ????????? ????????? ????????? ?????? ??????
        const newURLsArray = []; // ????????? ?????????????????? url???
        const pastURLs = []; //  ?????? ???????????? url???

        for (let i = 0; i < imgURLs.length; i++) {
            await Promise.all(
                carCustomURLs.map(async (el) => {
                    if (el.imgURL === imgURLs[i]) {
                        newURLsArray.push(el.imgURL);
                    } else {
                        pastURLs.push(el.imgURL);
                    }
                }),
            );
        }

        // ????????? ??????( ????????? url??? - ????????? ?????????????????? url??? )
        const newURLs = imgURLs.filter((el) => {
            return !newURLsArray.includes(el);
        });
        // ????????? ??????( ?????? ???????????? url??? - ????????? ?????????????????? url??? )
        const forDelete = [
            // ?????? ??????
            ...new Set(
                pastURLs.filter((el) => {
                    return !newURLsArray.includes(el);
                }),
            ),
        ];

        // 4. ????????? url??? ??????
        await Promise.all(
            newURLs.map(async (el) => {
                return await this.carImgRepository.save({
                    carCustom,
                    imgURL: el,
                });
            }),
        );

        // 5. ????????? url??? ??????
        await Promise.all(
            forDelete.map(async (el) => {
                return await this.carImgRepository.delete({
                    carCustom,
                    imgURL: el,
                });
            }),
        );

        // 6. carCustom??? ???????????? ????????? ?????? ?????? ??? ??????

        const saveResult = await this.carImgRepository.find({
            where: { carCustom },
            relations: ['carCustom'],
        });

        return saveResult;
    }
}
