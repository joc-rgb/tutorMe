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

