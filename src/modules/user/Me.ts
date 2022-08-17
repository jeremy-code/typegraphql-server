import { Resolver, Query, Ctx } from "type-graphql";

import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class MeResolver {
	@Query(() => User, { nullable: true, complexity: 5 })
	async me(@Ctx() ctx: MyContext): Promise<User | undefined | null> {
		if (!ctx.req.session!.userId) {
			return undefined;
		}
		const user = User.findOne({
			where: { id: parseInt(ctx.req.session!.userId) },
		});

		return user;
	}
}
