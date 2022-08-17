import Express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import session from "express-session";
import createComplexityRule, {
	simpleEstimator,
} from "graphql-query-complexity";
import "reflect-metadata";
import { redis } from "./redis";

import { createSchema } from "./utils/createSchema";

const main = async () => {
	const schema = await createSchema();

	const apolloServer = new ApolloServer({
		schema,
		context: ({ req, res }: { req: Request; res: Response }) => ({
			req,
			res,
		}),
		validationRules: [
			createComplexityRule({
				maximumComplexity: 8,
				variables: {},
				onComplete: (complexity: number) => {
					console.log("Query Complexity:", complexity);
				},
				estimators: [
					simpleEstimator({
						defaultComplexity: 1,
					}),
				],
			}),
		],
	});

	const app = Express();
	const RedisStore = connectRedis(session);

	app.use(
		cors({
			credentials: true,
			origin: "http://localhost:3000",
		})
	);

	app.use(
		session({
			store: new RedisStore({
				client: redis,
			}),
			name: "qid",
			secret: "aslkdfjoiq12312",
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
			},
		})
	);

	apolloServer.applyMiddleware({ app, cors: false });

	app.listen(4000, () => {
		console.log("server started on http://localhost:4000/graphql");
	});
};

main().catch((err) => console.error(err));
