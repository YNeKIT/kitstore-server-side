import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsOptional()
	@IsString({
		message: 'Name must be a string'
	})
	name?: string

	@IsString({
		message: 'Email is obligatory'
	})
	@IsEmail(
		{},
		{
			message: 'Please provide a valid email address'
		}
	)
	email: string

	@IsString({
		message: 'Password is obligatory'
	})
	@MinLength(6, {
		message: 'Password must contain at least 6 characters'
	})
	password: string
}
