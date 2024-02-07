import { create } from 'zustand';
import { initialData } from './seed';
import prisma from '../lib/prisma';



async function main() {

  // 1. Borrar registros previos
  // await Promise.all( [
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();

  
  // ]);
  
  const { users } = initialData;


  await prisma.user.createMany({
    data: users
  });

  console.log( 'Seed executed' );
}


( () => {

  if ( process.env.NODE_ENV === 'production' ) return;


  main();
} )();