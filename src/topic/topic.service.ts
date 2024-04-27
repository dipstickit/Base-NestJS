import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TopicService {

  constructor(
    @InjectRepository(Topic) private readonly topicRepo: Repository<Topic>,
  ) { }

  create(createTopicDto: CreateTopicDto) {
    const { title, description } = createTopicDto;
    const topic = new Topic();
    topic.title = title;
    topic.description = description;
    return this.topicRepo.save(topic);
  }

  findAll() {
    return `This action returns all topic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topic`;
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    return `This action updates a #${id} topic`;
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
