import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { CommentService } from './../comment/comment.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly commentService: CommentService) { }


    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }
    @Get(':id/comments')
    getUserComments(@Param('id') id: string) {
        return this.commentService.findUsersComments(id)
    }
    @Put(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto)
    }
}
