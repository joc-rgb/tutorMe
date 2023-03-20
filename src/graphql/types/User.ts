import { builder } from "../builder";

builder.prismaObject('User', {
    fields: (t) => ({
      id: t.exposeID('id'),
      name: t.exposeString('name'),
      email: t.exposeString('email'),
      location: t.exposeString('location',{nullable: true }),
      profileImg: t.expose('profileImg', { type: 'String', nullable: true }),
      phoneNumber: t.expose('phoneNumber', { type: 'String', nullable: true }),
      about: t.expose('about', { type: 'String', nullable: true }),
      expertiseIn: t.exposeStringList('expertiseIn'),
      highestEducationLvl: t.expose('highestEducationLvl', { type: 'String', nullable: true }),
      posts: t.relation('posts')
    }),
  });

builder.queryField('users', (t)=>
  t.prismaField({
    type: ['User'],
    resolve:(query)=>
      prisma.user.findMany({...query})
    
  })

)
builder.queryField('getUserByEmail',(t)=>
  t.prismaField({
    type:'User',
    args:{
      email: t.arg.string({required:true})
    },
    resolve:async (query, root, args, ctx, info) =>
    prisma.user.findUniqueOrThrow({
      // the `query` argument will add in `include`s or `select`s to
      // resolve as much of the request in a single query as possible
      ...query,
      where: { email: args.email },
    }),
  })
)
builder.mutationField('user',(t)=>
t.prismaField({
  type:'User',
  args:{
    email: t.arg.string({required:true}),
    name:t.arg.string({required:true}),
    expertiseIn:t.arg.stringList()
  },
  resolve:async (query,_parent,args,ctx)=>{
    const { email,expertiseIn,name } = args
    return prisma.user.create({
      ...query,
      data:{
        name,
        email,
        expertiseIn:[]
      }
    })
  }
})
)

