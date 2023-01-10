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
  upvote: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const { prisma } = ctx;

      const obj = prisma.vote.create({
        data: {
          post: {
            connect: {
              id: input.postId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
          direction: "UP",
        },
      });

      return obj;
    }),
  downvote: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const { prisma } = ctx;

      const obj = prisma.vote.create({
        data: {
          post: {
            connect: {
              id: input.postId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
          direction: "DOWN",
        },
      });

      return obj;
    }),
  getVotesCount: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { postId } = input;

      const upvotes = prisma.vote.aggregate({
        _count: {
          id: true,
        },
        where: {
          postId: postId,
          direction: "UP",
        },
      });

      return upvotes;
    }),
  getDownVotesCount: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { postId } = input;

      const downvotes = prisma.vote.aggregate({
        _count: {
          id: true,
        },
        where: {
          postId: postId,
          direction: "DOWN",
        },
      });

      return downvotes;
    }),
});
