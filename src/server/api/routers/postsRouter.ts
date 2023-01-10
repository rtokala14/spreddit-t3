import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
  getSub: publicProcedure
    .input(
      z.object({
        subId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { subId } = input;
      const { prisma } = ctx;

      const subreddit = prisma.subreddit.findUnique({
        where: {
          id: subId,
        },
      });
      return subreddit;
    }),
  getUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const { prisma } = ctx;

      const username = prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      return username;
    }),
});
