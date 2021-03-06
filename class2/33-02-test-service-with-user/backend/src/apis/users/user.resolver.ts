import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService, //
    ) {}

    @Mutation(() => User)
    async createUser(
        @Args('email') email: string,
        @Args('password') password: string,
        @Args('name') name: string,
        @Args({ name: 'age', type: () => Int }) age: number,
    ) {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        return this.userService.create({ email, hashedPassword, name, age });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => String)
    fetchUser(
        @CurrentUser() currentUser: ICurrentUser, //
    ) {
        console.log('currentUser는??!', currentUser);
        console.log('fetchUser 실행 완료!!!');
        return 'asdf';
    }
}
