import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';
import { NOTFOUND_TOPIC } from 'src/utils/message';
import { PostFilterDto } from './dto/filter-post.dto';

@Injectable()
export class TopicService {

  constructor(
    @InjectRepository(Topic) private readonly topicRepo: Repository<Topic>,
  ) { }

  async create(createTopicDto: CreateTopicDto) {
    const { title, description } = createTopicDto;
    const topic = new Topic();
    topic.title = title;
    topic.description = description;
    return await this.topicRepo.save(topic);
  }

  async findAll(queryObj: PostFilterDto) {
    const {
      title,
      description,
      sortBy,
      sortDescending,
      pageSize,
      current,
    } = queryObj;

    const defaultLimit = pageSize ? pageSize : 10;
    const defaultPage = current ? current : 1;
    const offset = (defaultPage - 1) * defaultLimit;

    const query = this.topicRepo.createQueryBuilder('topic');

    if (title)
      query.andWhere('topic.title ILike :title', {
        title: `%${title}%`,
      });
    if (description)
      query.andWhere('topic.description ILike :description', {
        description: `%${description}%`,
      });

    const totalItems = await query.getCount();
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const sortableCriterias = ['title', 'description'];

    const result = await query
      .orderBy(
        sortableCriterias.includes(sortBy) ? `topic.${sortBy}` : '',
        sortDescending ? 'DESC' : 'ASC',
      )
      .offset(offset)
      .limit(defaultLimit)
      .getMany();

    const data = result.map((topic) => {
      return {
        ...topic,
      };
    });

    return {
      currentPage: defaultPage,
      totalPages: totalPages,
      pageSize: defaultLimit,
      totalItems: totalItems,
      items: data,
    };
  }

  async findOne(id: number) {
    const topic: Topic = await this.topicRepo.findOneBy({ id });
    if (!topic) throw new BadRequestException(NOTFOUND_TOPIC);
    return topic;
  }

  async update(id: number, updateTopicDto: UpdateTopicDto) {
    const { title, description } = updateTopicDto;
    const topic = await this.topicRepo.findOneBy({ id });
    if (!topic) throw new BadRequestException(NOTFOUND_TOPIC);
    topic.title = title;
    topic.description = description;
    return await this.topicRepo.save(topic);
  }

  async remove(id: number) {
    const user = await this.topicRepo.findOneBy({ id });
    if (!user) throw new BadRequestException(NOTFOUND_TOPIC);
    return this.topicRepo.softDelete(id);
  }
}
