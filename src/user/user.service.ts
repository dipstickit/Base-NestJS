import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CONFLICT_EMAIL, CONFLICT_USERNAME, NOTFOUND_USER } from 'src/utils/message';
import { UserFilterDto } from './dto/filter-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email } = createUserDto;
        const userExist = await this.userRepo.findOneBy({ email });
        if (userExist) throw new BadRequestException(CONFLICT_EMAIL);
        const user = this.userRepo.create(createUserDto);
        return await this.userRepo.save(user);
    }

    async findOne(id: number) {
        const user: User = await this.userRepo.findOneBy({ id });
        if (!user) throw new BadRequestException(NOTFOUND_USER);
        return user;
    }

    async findAll(queryObj: UserFilterDto) {
        const {
            username,
            email,
            phone,
            isActive,
            roleId,
            sortBy,
            sortDescending,
            pageSize,
            current,
        } = queryObj;

        const defaultLimit = pageSize ? pageSize : 10;
        const defaultPage = current ? current : 1;
        const offset = (defaultPage - 1) * defaultLimit;

        const query = this.userRepo
            .createQueryBuilder('user')

        if (username)
            query.andWhere('user.username ILike :username', {
                username: `%${username}%`,
            });
        if (email)
            query.andWhere('user.email ILike :email', {
                email: `%${email}%`,
            });
        if (phone)
            query.andWhere('user.phone ILike :phone', {
                phone: `%${phone}%`,
            });
        if (typeof isActive === 'boolean')
            query.andWhere('user.isActive = :isActive', { isActive });

        const totalItems = (await query.getMany()).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);

        const sortableCriterias = ['username', 'email', 'dob'];

        const result = await query
            .orderBy(
                sortableCriterias.includes(sortBy) ? `user.${sortBy}` : '',
                sortDescending ? 'DESC' : 'ASC',
            )
            .offset(offset)
            .limit(defaultLimit)
            .getMany();

        const data = result.map((user) => {
            return {
                ...user,
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

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        const { username, password, ...rest } = updateUserDto;
        const user = await this.userRepo.findOneBy({ username });
        if (user && user.id !== id)
            throw new BadRequestException(CONFLICT_USERNAME);
        const existUser = await this.userRepo.findOne({ where: { id } });
        if (!existUser) throw new BadRequestException(NOTFOUND_USER);

        return this.userRepo.update(id, {
            username,
            password,
            ...rest,
        });
    }
}
