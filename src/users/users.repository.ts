import {UserModel} from '@prisma/client';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';
import {User} from './user.entity';
import {IUsersRepository} from './users.repository.interface';
import {PrismaService} from './../database/prisma.service';

@injectable()
export class UsersRepository implements IUsersRepository {
	// eslint-disable-next-line prettier/prettier
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) { }
	async create({email, password, name}: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		});
	}

	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}
