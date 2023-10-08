import { AuthService } from './auth.service';

import { Body,Controller, Post,Get,Patch,Delete,Param,Query,NotFoundException,Session} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptor/serlize.interceptor';
import { UserDto } from './dto/users.dtos';
import { CreateSigninDto } from './dto/create-signin.dto';
@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(private usersService:UsersService,private authService:AuthService){}
    
    @Post('/signup')
    async createUser(@Body() body:CreateUserDto , @Session() session:any ){
      const user= await this.authService.signup(body.name,body.address,body.email,body.password,body.phone_number)
        session.userId=user.id;
        return user;
   
    }
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    

    @Post('/signin')
    async signin(@Body() body:CreateSigninDto , @Session() session:any){
        const user= await this.authService.signin(body.email,body.password)
        session.userId = user.id;
        return user;
    }

    @Get('/whoami')
    whoAmI(@Session() session:any){
        return this.usersService.findOne(session.userId)
    }
    @Get('/colors/color')
    setColor(@Param('color') color:string,@Session() session:any){
        session.color=color;
    }
    @Get('/color')
    getColor(@Session() session:any){
       return session.color
    }


    @Get('/:id')
    
   async findUser(@Param('id') id:string)
    {
        const user=await this.usersService.findOne(parseInt(id));
        if(!user)
        {
            throw new NotFoundException('User is not found')
        }
        return user
    }
    @Get()
    findAllUser(@Query('email') email:string)
    {
        this.usersService.find(email)

    }

    @Delete('/:id')
    removeUser(@Param('id') id:string)
    {
        this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:UpdateUserDto)
    {
        this.usersService.update(parseInt(id),body)
    }
}
