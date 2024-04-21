import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TopicEntity } from 'src/topic/entities/topic.entity';
import { UserEntity } from 'src/user/entities/user.entity';


@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne((type) => UserEntity, (user) => user.comments)
  user: UserEntity;

  @ManyToOne((type) => TopicEntity, (topic) => topic.comments)
  topic: TopicEntity;
}