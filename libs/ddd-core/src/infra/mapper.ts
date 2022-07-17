
export interface IMapper<TDomain, TDto>
{
  toDTO(input: TDomain): TDto;
  toDomain(input: TDto): TDomain;
}
