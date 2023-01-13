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
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
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
  deleteVote: protectedProcedure
    .input(
      z.object({
        voteID: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { voteID } = input;

      const res = prisma.vote.delete({
        where: {
          id: voteID,
        },
      });

      return res;
    }),
  createTweet: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
        subredditId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { title, body, subredditId } = input;

      const res = prisma.post.create({
        data: {
          title: title,
          author: {
            connect: {
              id: session.user.id,
            },
          },
          subreddit: {
            connect: {
              id: subredditId,
            },
          },
          body: body,
        },
      });

      return res;
    }),
  deletePost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { postId } = input;

      const delPost = await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      return {
        delPost,
      };
    }),
  fetchSubreddits: protectedProcedure
    .input(
      z.object({
        subName: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { subName } = input;

      const results = prisma.subreddit.findMany({
        where: {
          name: {
            contains: subName,
            mode: "insensitive",
          },
        },
        take: 5,
      });

      return results;
    }),
  createSubreddit: protectedProcedure
    .input(
      z.object({
        subName: z.string(),
        desc: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { subName, desc } = input;

      const newSub = prisma.subreddit.create({
        data: {
          name: subName,
          description: desc,
          creator: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });

      return newSub;
    }),
  getPost: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { postId } = input;

      const res = prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          subreddit: true,
          comments: true,
          author: true,
          votes: true,
        },
      });

      return res;
    }),
});
