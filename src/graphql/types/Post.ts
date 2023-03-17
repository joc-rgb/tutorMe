import { builder } from "../builder";

builder.prismaObject('Post', {
    fields: (t) => ({
      id: t.exposeID('id'),
      title: t.exposeString('title'),
      description: t.exposeString('description'),
      tag: t.exposeStringList('tag'),
      pricePerSession: t.exposeFloatList('pricePerSession'),
      tutorMode: t.expose('tutorMode', { type: Mode }),
      contact: t.exposeStringList('contact'),
      postedById: t.exposeInt('postedById'),
      postedBy: t.relation('postedBy'),
      createdAt: t.expose('createdAt', {type: "Date"})
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

builder.mutationField("createPost",(t)=>
  t.prismaField({
    type:'Post',
    args:{
      title: t.arg.string({required:true}),
      description: t.arg.string({required:true}),
      tag:t.arg.stringList({required:true}),
      pricePerSession:t.arg.floatList({required:true}),
      tutorMode: t.arg({type:Mode,required:true}),
      contact: t.arg.stringList({required:true}),
      postedById: t.arg.int({ required: true })
    },
    resolve: async (query, _parent, args, ctx) => {
      const userInfo = (await ctx).user
      if(!userInfo){
        throw new Error("Please login in to perform this action!")
      }
      
      const { title, description, pricePerSession,tutorMode,contact,postedById, tag} = args
      return prisma.post.create({
        ...query,
        data: {
          title,
          description,
          pricePerSession,
          tutorMode,
          contact,
          postedBy: { connect: { id: postedById } },
          tag,
          
        }
      })
  }})
)