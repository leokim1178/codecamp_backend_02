import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateModelInput } from './dto/createModelInput';
import { UpdateModelInput } from './dto/updateModelInput';
import { Model } from './entities/model.entity';
import { ModelService } from './wd.service';

@Resolver()
export class ModelResolver {
    constructor(private readonly modelService: ModelService) {}

    @Query(() => [Model])
    fetchModels() {
        return this.modelService.findAll();
    }
    @Query(() => Model)
    fetchModel(
        @Args('modelId')
        modelId: string,
    ) {
        return this.modelService.findOne({ modelId });
    }

    @Mutation(() => Model)
    createModel(
        @Args('createModelInput')
        createModelInput: CreateModelInput,
    ) {
        return this.modelService.create({ createModelInput });
    }
    @Mutation(() => Model)
    async updateModel(
        @Args('modelId')
        modelId: string, //
        @Args('updateModelInput')
        updateModelInput: UpdateModelInput,
    ) {
        return await this.modelService.update({
            modelId,
            updateModelInput,
        }); //
    }
}
