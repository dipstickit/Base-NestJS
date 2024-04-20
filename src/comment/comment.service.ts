import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
    findUsersComments(userId: string){
        return "this is"
    }
}
