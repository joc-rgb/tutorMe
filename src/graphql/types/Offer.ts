import { builder } from "../builder";

builder.prismaObject('Offer', {
    fields: (t) => ({
      id: t.exposeID('id'),
      title: t.exposeString('title'),
      description: t.exposeString('description'),
      tag: t.exposeStringList('tag'),
      pricePerSession: t.exposeFloatList('pricePerSession'),
      tutorMode: t.expose('tutorMode', { type: Mode }),
      contact: t.exposeStringList('contact'),
      postedById: t.exposeID('postedById'),
    }),
  }
);

const Mode = builder.enumType('Mode', {
  values: ['ONLINE', 'IN_PERSON','BOTH'] as const,
})

builder.queryField('offers', (t)=>
  t.prismaField({
    type: ['Offer'],
    resolve:(query)=>prisma.offer.findMany({...query})
  })
)

builder.mutationField("createOffer",(t)=>
  t.prismaField({
    type:'Offer',
    args:{
      title: t.arg.string({required:true}),
      description: t.arg.string({required:true}),
      tag:t.arg.stringList({required:false}),
      pricePerSession:t.arg.floatList({required:true}),
      tutorMode: t.arg({type:Mode,required:true}),
      contact: t.arg.stringList({required:true}),
      postedById: t.arg.int({required:true})
    },
    resolve: async (query, _parent, args, ctx) => {
      const { title, description, postedById,pricePerSession,tutorMode,contact } = args

      return prisma.offer.create({
        ...query,
        data: {
          title,
          description,
          postedById,
          pricePerSession,
          tutorMode,
          contact
        }
      })
  }})
)