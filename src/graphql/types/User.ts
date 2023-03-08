import { builder } from "../builder";

builder.prismaObject('User', {
    fields: (t) => ({
      id: t.exposeID('id'),
      username: t.exposeString('username'),
      email: t.exposeString('email'),
      location: t.exposeString('location'),
      profileImg: t.expose('profileImg', { type: 'String', nullable: true }),
      phoneNumber: t.expose('phoneNumber', { type: 'String', nullable: true }),
      about: t.expose('about', { type: 'String', nullable: true }),
      expertiseIn: t.exposeStringList('expertiseIn'),
      highestEducationLvl: t.expose('highestEducationLvl', { type: 'String', nullable: true }),
      offers: t.relation('offers')
    }),
  });

  builder.queryField('users', (t)=>
  t.prismaField({
    type: ['User'],
    resolve:(query)=>
      prisma.user.findMany({...query})
    
  })
)