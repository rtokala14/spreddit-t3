import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        where: z
          .object({
            userId: z.string().optional(),
            subredditId: z.string().optional(),
          })
          .optional(),
        // .optional(),
      })
    )
    .query(({ ctx, input }) => {
      const { where } = input;
      return ctx.prisma.post.findMany({
        where,
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
  updateUsernameDefault: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma, session } = ctx;

      const res = prisma.user.update({
        where: {
          id: session?.user?.id,
        },
        data: {
          name: input.userId,
        },
      });

      return res;
    }),
  createCommentPost: protectedProcedure
    .input(
      z.object({
        body: z.string(),
        postId: z.string(),
        commId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { body, postId, commId } = input;

      const res = prisma.comment.create({
        data: {
          body: body,
          author: {
            connect: {
              id: session.user.id,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        },
      });

      return res;
    }),
  getComments: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { postId } = input;
      const res = prisma.comment.findMany({
        where: {
          postId: postId,
          commentId: null,
        },
        include: {
          author: true,
          replies: true,
          Vote: true,
        },
      });
      return res;
    }),
  getReplies: publicProcedure
    .input(
      z.object({
        commId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { commId } = input;

      const res = prisma.comment.findMany({
        where: {
          parentComment: {
            id: commId,
          },
        },
        include: {
          author: true,
          replies: true,
          Vote: true,
        },
      });

      return res;
    }),
  addReply: protectedProcedure
    .input(
      z.object({
        parentId: z.string(),
        childId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { parentId, childId } = input;

      const res = prisma.comment.update({
        where: {
          id: parentId,
        },
        data: {
          replies: {
            connect: [
              {
                id: childId,
              },
            ],
          },
        },
      });

      return res;
    }),
  getUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { userId } = input;

      const res = prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          accounts: true,
          posts: true,
          comments: true,
        },
      });

      return res;
    }),
});
