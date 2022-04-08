export interface PageParams {
    page?: number;
    size?: number;
    sortBy?: string;
}

export interface Page<T> {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    };
    totalElements: number;
    totalPages: number;
}
