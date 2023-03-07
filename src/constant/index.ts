export type IUser = ({
        username: string;
        email: string;
        location: string;
        about: string;
        expertiseIn: string[];
        highestEducationLvl?: undefined;
    } | {
        username: string;
        email: string;
        location: string;
        about: string;
        expertiseIn: string[];
        highestEducationLvl: string;
    })

export const users:IUser[] = [
    {
        username:'mike',
        email: 'mike@mail.com',
        location:'Sarawak, Malaysia',
        about:'I am a native English speaker with 10 years of English tutoring experience.',
        expertiseIn:['english'],
    },
    {
        username:'jennislee',
        email: 'lee@mail.com',
        location:'Singapore',
        about:'I am a senior actress with more than 20 years experience.',
        expertiseIn:['acting'],
        
    },
    {
        username:'jess',
        email: 'jess@mail.com',
        location:'United Kingdom',
        about:'A senior backend developer with 10+ years of industry experience',
        expertiseIn:['coding'],
        highestEducationLvl:'NUS Singapore'
    },
]
