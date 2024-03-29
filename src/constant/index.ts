import { Post } from "@prisma/client";

export type IUserInput = ({
        name: string;
        email: string;
        location: string;
        about: string;
        expertiseIn: string[];
        highestEducationLvl?: undefined;
    } | {
        name: string;
        email: string;
        location: string;
        about: string;
        expertiseIn: string[];
        highestEducationLvl: string;
    })

export const users:IUserInput[] = [
    {
        name:'mike',
        email: 'mike@mail.com',
        location:'Sarawak, Malaysia',
        about:'I am a native English speaker with 10 years of English tutoring experience.',
        expertiseIn:['english'],
    },
    {
        name:'jennislee',
        email: 'lee@mail.com',
        location:'Singapore',
        about:'I am a senior actress with more than 20 years experience.',
        expertiseIn:['acting'],
        
    },
    {
        name:'jess',
        email: 'jess@mail.com',
        location:'United Kingdom',
        about:'A senior backend developer with 10+ years of industry experience',
        expertiseIn:['coding'],
        highestEducationLvl:'NUS Singapore'
    },
]


export const TAGS=[
    'math',
    'english', 
    'history',
    'geography',
    'biology',
    'coding', 
    'physics',
    'chemistry',
    'calculus',
    'language',
    'art',
    'other',
]

export const educationLvl = [
    'Elementary school',
    'High School',
    'Diploma',
    'Bachelor Degree',
    'Master Degree',
    'Professional or Doctorate'
]

export type IPost = 
    { postedBy: { id: string; name: string; email: string; }; } & Post

