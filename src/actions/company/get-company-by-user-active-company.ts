'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';



export const getCompanyByUserActiveCompany = async() => {

  const session = await auth();

  if ( !session?.user ) {
    return {
      ok: false,
      message: 'You must be registered',
    }
  }

  try {

    const company = await prisma.company.findUnique({
      where: {
        id: session.user.companyId
      },
      include: {
        projects: {
          select: {
              id: true,
              name: true,
              status: true
          }
        },
        users: {
          select: {
              id: true,
              name: true,
              lastName: true
          }
        }
      }
    })
    
    return {
      ok: true,
      company: company,
    }

  } catch (error) {
    return {
      ok: false,
    }
  }




}