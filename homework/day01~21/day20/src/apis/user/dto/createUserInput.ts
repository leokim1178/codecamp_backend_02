import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    @Field(() => String)
    email: string;
    @Field(() => String)
    password: string;
    @Field(() => String)
    name: string;
    @Field(() => String)
    address: string;
    @Field(() => Int)
    age: number;
}
