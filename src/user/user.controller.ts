import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { CommentService } from './../comment/comment.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from 'src/decorator/customize';
import { CREATE_USER, GET_USER_DETAIL, GET_USERS } from 'src/utils/message';
import { UserFilterDto } from './dto/filter-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly commentService: CommentService) { }


    @Post()
    @ResponseMessage(CREATE_USER)
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }
    @Get(':id')
    @ResponseMessage(GET_USER_DETAIL)
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }
    @Get()
    @ResponseMessage(GET_USERS)
    findAll(@Query() query: UserFilterDto) {
        return this.userService.findAll(query);
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
