import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      include: {
        subreddit: true,
        votes: true,
        comments: true,
        author: true,
      },
    });
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
  upsertVote: protectedProcedure
    .input(
      z.object({
        voteId: z.string().optional(),
        postId: z.string(),
        newDirection: z.enum(["UP", "DOWN"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { voteId, newDirection, postId } = input;

      const ret = prisma.vote.upsert({
        where: {
          id: voteId,
        },
        update: {
          direction: newDirection,
        },
        create: {
          post: {
            connect: {
              id: postId,
            },
          },
          user: {
            connect: {
              id: session.user.id,
            },
          },
          direction: newDirection,
        },
      });

      return ret;
    }),
});
