/**
 * @See from Java model: rest.word.model.Word
 */
export interface WordDto {
    id: string;
    groupId: string;
    name: string;
    definition: string;
    done: boolean;
    createAt: string;
    updateAt: string;

    associate: string;
}

export interface WordCreateDto {
    groupId: string;
    name: string;
    definition: string;
    associate?: string;
    done?: boolean;
}

/**
 * @See from Java model: rest.group.model.GroupCard
 */
export interface WordGroupDto {
    id: string;
    name: string;
    createAt: string;
    updateAt: string;
    done: boolean;
    archived: boolean;
    words: WordDto[];
}

export interface WordGroupCreateDto {
    name: string;
    done?: boolean;
}