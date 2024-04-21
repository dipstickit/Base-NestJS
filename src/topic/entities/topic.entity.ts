import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentEntity } from '../../comment/entities/comment.entity';

@Entity()
export class TopicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany((type) => CommentEntity, (comment) => comment.topic)
  comments: CommentEntity[];
}