
export class UserDto {
    firstName: string
    lastName: string
    email: string
    tel: number
    visitingNo: string
}

export class UserTokens {
    access: string
    refresh: string
}

export class RegisterOutput  {
    user: UserDto
    token: UserTokens
}