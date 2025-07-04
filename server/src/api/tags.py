from fastapi import APIRouter, Depends, HTTPException, status

from services.tags import (
    CreateTagService,
    GetUserTagsService,
    DeleteTagService,
)
from dtos.tags import (
    CreateTagRequestDTO,
    TagResponseDTO,
    TagsListResponseDTO,
)

router = APIRouter(prefix='/tags', tags=['tags'])


@router.post(
    '/',
    response_model=TagResponseDTO,
    status_code=status.HTTP_201_CREATED,
)
async def create_tag(
    data: CreateTagRequestDTO,
    user_id: int,  # TODO: Получать из JWT токена
    service: CreateTagService = Depends(CreateTagService.build),
) -> TagResponseDTO:
    try:
        tag_dto = await service.execute(
            name=data.name,
            color=data.color,
            user_id=user_id,
        )
    except CreateTagService.TagNameInvalidException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'code': 'tag_name_invalid',
                'message': 'Tag name cannot be empty',
            },
        )
    except CreateTagService.TagNameTooLongException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'code': 'tag_name_too_long',
                'message': 'Tag name cannot exceed 100 characters',
            },
        )
    except CreateTagService.TagAlreadyExistsException:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                'code': 'tag_already_exists',
                'message': 'Tag with this name already exists',
            },
        )
    except CreateTagService.ColorInvalidException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'code': 'color_invalid',
                'message': 'Color must be in hex format (e.g., #FF0000)',
            },
        )

    return TagResponseDTO(
        id=tag_dto.id,
        name=tag_dto.name,
        color=tag_dto.color,
        created_at=tag_dto.created_at,
    )


@router.get(
    '/',
    response_model=TagsListResponseDTO,
    status_code=status.HTTP_200_OK,
)
async def get_user_tags(
    user_id: int,  # TODO: Получать из JWT токена
    service: GetUserTagsService = Depends(GetUserTagsService.build),
) -> TagsListResponseDTO:
    tags = await service.execute(user_id)

    return TagsListResponseDTO(
        tags=[
            TagResponseDTO(
                id=tag.id,
                name=tag.name,
                color=tag.color,
                created_at=tag.created_at,
            )
            for tag in tags
        ]
    )





@router.delete(
    '/{tag_id}',
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_tag(
    tag_id: int,
    user_id: int,  # TODO: Получать из JWT токена
    service: DeleteTagService = Depends(DeleteTagService.build),
) -> None:
    try:
        await service.execute(tag_id, user_id)
    except DeleteTagService.TagNotFoundException:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                'code': 'tag_not_found',
                'message': 'Tag not found',
            },
        )
