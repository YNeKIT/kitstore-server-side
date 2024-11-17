import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getById(id: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			},
			include: {
				favorites: true,
				orders: true,
				stores: true
			}
		})
		return user
	}

	async getByEmail(email: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				email
			},
			include: {
				favorites: true,
				orders: true,
				stores: true
			}
		})
		return user
	}

	async create(dto: AuthDto) {
		try {
			console.log('Creating user with email:', dto.email) 
			const user = await this.prisma.user.create({
				data: {
					name: dto.name,
					email: dto.email,
					password: await hash(dto.password)
				}
			})
			console.log('User created:', user) 
			return user
		} catch (error) {
			console.error('Error creating user:', error)
			throw new BadRequestException('Error creating user')
		}
	}
}
