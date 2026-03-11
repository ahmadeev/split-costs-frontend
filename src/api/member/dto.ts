export interface Member {
    id: number,
    name: string
}

export type CreateMemberDto = Omit<Member, 'id'>;
export type MemberResponseDTO = Member;
