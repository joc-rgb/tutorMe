import { builder } from "../builder";

builder.prismaObject('Post', {
    fields: (t) => ({
      id: t.exposeID('id'),
      title: t.exposeString('title'),
      description: t.exposeString('description'),
      img:t.exposeString('img',{nullable: true }),
      tag: t.exposeStringList('tag'),
      pricePerSession: t.exposeFloatList('pricePerSession'),
      hourPerSession: t.exposeInt('hourPerSession'),
      tutorMode: t.expose('tutorMode', { type: Mode }),
      contact: t.exposeStringList('contact'),
      postedById: t.exposeInt('postedById'),
      createdAt: t.expose('createdAt', {type: "Date"}),
      postedBy: t.relation('postedBy'),
  })
});

const Mode = builder.enumType('Mode', {
  values: ['ONLINE', 'IN_PERSON','BOTH'] as const,
})


builder.queryField('posts', (t)=>
  t.prismaConnection({
    type: 'Post',
    cursor:'id',
    resolve:(query)=>prisma.post.findMany({...query})
  })
)

builder.queryField('post', (t)=>
  t.prismaField({
    type:'Post',
    args:{
      id: t.arg.int({required:true})
    },
    resolve:async (query, root, args, ctx, info) =>
      prisma.post.findUniqueOrThrow({
        ...query,
        where: { id: args.id },
      })
  }),
 
)

builder.queryField('similarPost', (t) =>
  t.prismaField({
    type: ['Post'],
    args: {
      tag: t.arg.string({ required: true })
    },
    resolve: async (query, root, args, ctx, info) => 
      prisma.post.findMany({
        ...query,
        where: {
          tag: {
            // use the has operator to match posts that have the specified tag in their tag array
            hasSome: args.tag
          }
        },
        take:5,
      })
    }));


builder.mutationField("createPost",(t)=>
  t.prismaField({
    type:'Post',
    args:{
      title: t.arg.string({required:true}),
      description: t.arg.string({required:true}),
      tag:t.arg.stringList({required:true}),
      pricePerSession:t.arg.floatList({required:true}),
      hourPerSession:t.arg.int({required:true}),
      tutorMode: t.arg({type:Mode,required:true}),
      contact: t.arg.stringList({required:true}),
      postedById: t.arg.int({ required: true }),
      img:t.arg.string()
    },
    resolve: async (query, _parent, args, ctx) => {
      const userInfo = (await ctx).user
      if(!userInfo){
        throw new Error("Please login in to perform this action!")
      }
      
      const { title, description, pricePerSession,tutorMode,contact,postedById, tag,img,hourPerSession} = args
      console.log(hourPerSession)
      return prisma.post.create({
        ...query,
        data: {
          title,
          description,
          pricePerSession,
          hourPerSession,
          tutorMode,
          contact,
          postedBy: { connect: { id: postedById } },
          tag,
          img
        }
      })
  }})
)

builder.mutationField("updatePost", (t)=>
  t.prismaField({
    type:'Post',
    args:{
      id: t.arg.id({required:true}),
      title: t.arg.string({required:true}),
      description: t.arg.string({required:true}),
      tag:t.arg.stringList({required:true}),
      pricePerSession:t.arg.floatList({required:true}),
      hourPerSession:t.arg.int({required:true}),
      tutorMode: t.arg({type:Mode,required:true}),
      contact: t.arg.stringList({required:true}),
      img:t.arg.string()
    },
    resolve: async (query, _parent, args, ctx) => {
      const userInfo = (await ctx).user
      if(!userInfo){
        throw new Error("Please login in to perform this action!")
      }

      const postOwner = await prisma.post.findFirstOrThrow({
        where: {
          id:Number(args.id),
          postedBy: {
            email: userInfo.email
          } 
      }
      })
      const { title, description, pricePerSession,tutorMode,contact, tag,img,hourPerSession} = args
      return prisma.post.update({
        where: {id: Number(args.id) },
        data: {
          title,
          description,
          pricePerSession,
          hourPerSession,
          tutorMode,
          contact,
          tag,
          img
        }
      })
    }
  })
)