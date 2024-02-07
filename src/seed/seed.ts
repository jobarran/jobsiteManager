import bcrypt from 'bcryptjs'

interface SeedUser {
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: 'admin' | 'user'
}

interface SeedData {
    users: SeedUser[];
}

export const initialData: SeedData = {

    users: [
        {
            email: 'jbarrandeguy@gmail.com',
            name: 'Joaquin',
            lastName: 'Barrandeguy',
            password: bcrypt.hashSync('123456'),
            role: 'admin'
        },
        {
            email: 'toli@gmail.com',
            name: 'Martina',
            lastName: 'De Luca',
            password: bcrypt.hashSync('123456'),
            role: 'user'
        },
        
    ]

}